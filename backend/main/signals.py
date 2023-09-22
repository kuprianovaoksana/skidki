from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.db.models import Q

from django_celery_beat.models import PeriodicTask

from .logic.notification import create_task_notification
from .models import Product, Request


@receiver(pre_save, sender=Request)
def update_request(sender, instance, **kwargs):
    """
    Функция update_request обновляет объект задачи на основе значений атрибутов freeze_task и period_date.

    :param sender:
        Параметр `sender` относится к классу модели, который вызвал сигнал.
        В данном случае это может быть класс модели, у которого сигнал post_save подключен к
        функции update_request.

    :param instance:
        Параметр «instance» — это экземпляр объекта модели, который активировал функцию update_request.
        Он представляет объект, который был обновлен или создан.
    """
    if not instance._state.adding:
        task_obj = PeriodicTask.objects.get(pk=instance.task.pk)
        if instance.freeze_task:
            task_obj.enabled = False
            task_obj.save()
            instance.status = 3
            # print("Задержка задачи")
        else:
            PeriodicTask.objects.filter(pk=instance.task.pk).update(expires=instance.period_date)
            task_obj.enabled = True
            task_obj.save()
            instance.status = 0
            # print("Обновление задачи")

    # print("Создание задачи")


@receiver(pre_save, sender=Product)
def check_notification(sender, instance, **kwargs):
    """
    Функция представляет собой приемник сигнала предварительного сохранения в Python, который проверяет
    изменения в объекте Product и создает уведомления о задачах на основе определенных условий.

    :param sender:
        Параметр sender относится к классу модели, отправляющему сигнал.
        В данном случае это модель «Продукт».

    :param instance:
        Параметр «instance» относится к сохраняемому экземпляру модели «Product».
        Он представляет объект, который создается или обновляется.
    """
    if not instance._state.adding:  # проверка, что объект изменен, а не создан
        product = Product.objects.get(pk=instance.pk)
        discount = instance.get_discount()
        old_discount = product.get_discount()
        difference_discount = discount - old_discount

        price = instance.current_price
        title = instance.title

        success_requests = (instance.request.filter(status='В работе')
                            .filter(Q(discount__lte=discount) | Q(price__gte=price))
                            .filter(Q(notification_type=0) | Q(notification_type=2)))

        if success_requests.exists():
            create_task_notification(success_requests, title, discount, difference_discount, 'find')

        if difference_discount > 0:
            discount_up_request = (instance.request.filter(status='В работе')
                                   .filter(Q(notification_type=0) | Q(notification_type=1))
                                   .exclude(Q(discount__lte=discount) | Q(price__gte=price)))

            if discount_up_request.exists():
                create_task_notification(discount_up_request, title, discount, difference_discount, 'changed')
