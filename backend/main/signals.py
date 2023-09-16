from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.db.models import Q

from .models import Product
from .tasks import create_email_notification, create_lk_notification


@receiver(pre_save, sender=Product)
def check_notification(sender, instance, **kwargs):
    """
    Сигнал формирует список запросов для направления уведомлений о нахождении товара или увеличении скидки.
    pre_save для расчета как изменилась скидка
    success_requests - queryset из объектов Request, в которых товар найден по установленной цене/скидке
    discount_up_request - queryset из объектов Request, в которых товар не найден, но скидка выросла
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


def create_task_notification(qs, title, discount, difference_discount, about):
    """
    Функция отправляет создает задачу на отправку уведомления в указанных пользователем каналах
    emails: список почтовых адресов, на которые будут оптравлены уведомления
    lk_ids: список id объектов Request, связанным пользователям уведомление поступил в личный кабинет
    Списки emails и lk_ids формируются для избежания излишних запросов к БД
    """
    request_notifications = (qs.filter(Q(email_notification=True) | Q(lk_notification=True))
                             .select_related('user')
                             .only('user__email', 'product__title', 'email_notification', 'lk_notification'))

    emails = []
    lk_ids = []

    for request in request_notifications:
        email = request.user.email if request.email_notification else None
        request_id = request.id if request.lk_notification else None

        if email:
            emails.append(email)

        if request_id:
            lk_ids.append(request_id)

    if emails:
        create_email_notification.apply_async((emails, title, discount, difference_discount, about))

    if lk_ids:
        create_lk_notification.apply_async((lk_ids, title, discount, difference_discount, about))