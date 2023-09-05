from rest_framework import generics, status, viewsets
from rest_framework import permissions
from templated_mail.mail import BaseEmailMessage
from .serializers import (ProductSerializer, RequestSerializer, UserEmailSerializer, )
from .models import Product, Request
from django.contrib.auth import get_user_model
from rest_framework.decorators import action
from djoser import utils
from django.contrib.auth.tokens import default_token_generator
from rest_framework.response import Response
from skidkalov.settings import EMAIL_CHANGE_CONFIRM_URL
from djoser.serializers import UidAndTokenSerializer
from django.core.cache import cache


User = get_user_model()


class ProductCreate(generics.CreateAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class ProductList(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class RequestCreate(generics.CreateAPIView):
    serializer_class = RequestSerializer
    queryset = Request.objects.all()
    permission_classes = [permissions.IsAuthenticated]


class RequestRUD(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RequestSerializer
    queryset = Request.objects.all()


class RequestList(generics.ListAPIView):
    serializer_class = RequestSerializer
    queryset = Request.objects.all()


class UserEmailChange(viewsets.ModelViewSet):
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
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user

        if user:
            new_email = cache.get(f'user_{user.id}')
            user.change_email(new_email)
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    def send_email_confirm(self, user, new_email):
        cache_key = f'user_{user.id}'
        cache.set(cache_key, new_email, timeout=86400)
        context = {"user": user}
        to = [new_email]
        ChangeEmail(self.request, context).send(to)


class ChangeEmail(BaseEmailMessage):
    template_name = "email/change_email.html"

    def get_context_data(self):
        context = super().get_context_data()
        user = context.get("user")
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = EMAIL_CHANGE_CONFIRM_URL.format(**context)
        return context
