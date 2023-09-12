from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.db.models import Q

from .models import Product
from .tasks import to_email_notification, create_lk_notification


@receiver(pre_save, sender=Product)
def check_notification(sender, instance, **kwargs):
    if not instance._state.adding:
        discount = instance.get_discount()
        old_discount = Product.objects.get(pk=instance.pk).get_discount()
        difference_discount = discount - old_discount

        success_requests = (instance.request.filter(status='В работе').filter(discount__lte=discount)
                            .filter(Q(notification_type=0) | Q(notification_type=2)))

        send_notification(success_requests, instance, discount, difference_discount, 'find')

        if difference_discount > 0:
            discount_up_request = (instance.request.filter(status='В работе')
                                   .filter(Q(notification_type=0) | Q(notification_type=1))
                                   .exclude(discount__lte=discount))

            send_notification(discount_up_request, instance, discount, difference_discount, 'changed')


def send_notification(qs, instance, discount, difference_discount, about):
    email_notification = qs.filter(email_notification=True)

    for request in email_notification:
        to_email_notification.apply_async((request.user.email, instance.title, discount,
                                           difference_discount, about))
        request.end_tracker('Завершен')

    lk_notification = qs.filter(lk_notification=True)

    for request in lk_notification:
        create_lk_notification.apply_async((request.id, instance.title, discount,
                                            difference_discount, about))
        request.end_tracker('Завершен')
