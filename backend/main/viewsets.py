import json

from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.contrib.auth.tokens import default_token_generator
from django.db import transaction
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import status, viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import APIException

from templated_mail.mail import BaseEmailMessage

from djoser import utils
from djoser.serializers import UidAndTokenSerializer
from django_celery_beat.models import IntervalSchedule, PeriodicTask

from .serializers import (ProductSerializer,
                          ProductHistorySerializer,
                          RequestSerializer,
                          NotificationsSerializer,
                          UserEmailSerializer)

from .models import Product, ProductHistory, Request, Notifications
from config.settings import EMAIL_CHANGE_CONFIRM_URL

User = get_user_model()


class ProductViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]  # FIXME FOR WORK
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'title',
        'shop',
        'old_price',
        'current_price',
        'url',
        'brand',
        'category',
        'click_rate',
    ]


class ProductHistoryViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]  # FIXME FOR WORK
    queryset = ProductHistory.objects.all()
    serializer_class = ProductHistorySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'product_id',
        'last_updated',
        'updated_price',
    ]


class RequestViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]  # FIXME FOR WORK
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'user',
        'endpoint',
        'price',
        'discount',
        'created_at',
        'completed_at',
        'period_date',
        'status',
    ]

    def perform_create(self, serializer):
        """
        Функция «perform_create» сохраняет сериализованный экземпляр, создает расписание интервалов для периодической
        задачи, создает периодическую задачу с указанными параметрами и назначает задачу экземпляру.

        :param serializer:
            Параметр `serializer`— это экземпляр класса сериализатора, который используется для проверки и
            сохранения данных, передаваемых методу `perform_create`.

            Он отвечает за преобразование данных в действительный объект Python и выполнение всех необходимых проверок.
        """
        try:
            with transaction.atomic():

                instance = serializer.save()
                schedule, created = IntervalSchedule.objects.get_or_create(
                    # Параметр every=1 в объекте IntervalSchedule определяет частоту интервала. В данном случае ему
                    # присвоено значение 1, что означает, что периодическая задача будет запускаться каждую единицу
                    # указанного периода (например, каждую 1 секунду, каждый 1 день и т.д.).
                    every=30,  # Enter a number 5 or more here to check it in seconds.
                    period=IntervalSchedule.SECONDS,  # FOR TESTING USE "SECONDS" IN REAL WORK "DAYS".
                )

                task = PeriodicTask.objects.create(
                    interval=schedule,
                    name=f"Request: {instance.endpoint}",
                    task="main.tasks.task_monitor",
                    kwargs=json.dumps({"request_id": instance.id}),
                    expires=instance.period_date
                )
                instance.task = task
                instance.save()

        except Exception as e:
            raise APIException(str(e))

    def perform_destroy(self, instance):
        """
        Функция выполняет операцию уничтожения экземпляра, удаляя связанную с ним задачу, если она существует.

        :param instance:
            Параметр «экземпляр» относится к экземпляру уничтожаемой модели.
            Другими словами, он представляет объект, который удаляется из базы данных.

        :return:
            Метод perform_destroy возвращает результат вызова метода perform_destroy родительского класса (суперкласса).
        """
        if instance.task is not None:
            instance.task.delete()
        return super().perform_destroy(instance)


class NotificationsViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]  # FIXME FOR WORK
    queryset = Notifications.objects.all()
    serializer_class = NotificationsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'request',
        'created_at',
    ]


class UserEmailChange(viewsets.ModelViewSet):
    """
    Класс UserEmailChange — это набор представлений, который позволяет аутентифицированным пользователям
    изменять свой адрес электронной почты и подтверждать изменение посредством проверки электронной почты.
    """
    queryset = User.objects.all()
    serializer_class = UserEmailSerializer
    permission_classes = [permissions.IsAuthenticated]
    token_generator = default_token_generator

    def get_serializer_class(self):
        if self.action == 'change_email_confirm':
            return UidAndTokenSerializer

        return self.serializer_class

    @action(['post'], detail=False)
    def change_email(self, request, *args, **kwargs):
        """
        Метод принимает от авторизованного пользователя новый адрес email, сериализует данные.
        Если новая почта корректная - вызывает метод send_email_confirm для формирования письма с подтверждением.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.request.user
        new_email = request.POST.get('email', None)

        if (user.email == new_email) or (not new_email):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        self.send_email_confirm(user, new_email)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(['post'], detail=False, permission_classes=[permissions.AllowAny])
    def change_email_confirm(self, request, *args, **kwargs):
        """
        Метод получает uid и token пользователя, когда он переходит по ссылке для подтверждения.
        UidAndTokenSerializer по uid и токену определяет пользователя.
        Из кэша по user.id достаем новую почту и перезаписываем ее
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user

        if user:
            new_email = cache.get(f'user_{user.id}')
            user.change_email(new_email)
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    def send_email_confirm(self, user, new_email):
        """
        Отправка письма с ссылкой для подтверждения смены email.
        id пользователя и новая почта записываются в кэш для дальнейшего извлечения,
        когда пользователь перейдет по ссылке для подтверждения смены почты
        """
        cache_key = f'user_{user.id}'
        cache.set(cache_key, new_email, timeout=86400)
        context = {"user": user}
        to = [new_email]
        ChangeEmail(self.request, context).send(to)


class ChangeEmail(BaseEmailMessage):
    """
    Класс ChangeEmail используется для генерации контекстных данных для шаблона электронной почты для изменения адреса
    электронной почты пользователя.
    """
    template_name = "email/change_email.html"

    def get_context_data(self):
        context = super().get_context_data()
        user = context.get("user")
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = EMAIL_CHANGE_CONFIRM_URL.format(**context)
        return context
