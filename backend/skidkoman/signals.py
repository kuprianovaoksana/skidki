from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Product
from .tasks import to_email_notification, create_lk_notification
from django.db.models import Q


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

# def send_email_notification(qs, instance, discount, difference_discount, notifi_type=None):
#     email_notification = qs.filter(email_notification=True)
#
#     for request in email_notification:
#         email = request.user.email
#         task_success_request.apply_async((email, instance.title, discount, difference_discount, notifi_type))
#
#         if notifi_type == 'find':
#             request.end_tracker('Завершен')
#     # print(f'send_email_notification, type={notifi_type}')
#
#
# def create_lk_notification(qs, instance, difference_discount, notifi_type=None):
#     lk_notification = qs.filter(lk_notification=True)
#
#     for request in lk_notification:
#         if notifi_type == 'find':
#             text = (f'Скидка на товар {instance.title} увеличилась до желаемой {instance.get_discount()}%. Вы можете перейти '
#                     f'в магазин и купить товар.')
#             request.end_tracker('Завершен')
#
#         elif notifi_type == 'changed':
#             text = (f'Скидка на товар {instance.title} увеличилась на {difference_discount}%. Вы можете перейти на '
#                     f'страницу магазина и купить товар {instance.title} или дождаться повышения скидки до желаемой.')
#
#         else:
#             continue
#
#         Notifications.objects.create(request=request, text=text)
        # print(f'create_lk_notification, type={notifi_type}\n{request.user.email} - {text}')



# def create_message(title, discount_difference, discount):
#     time_ends = (f'Срок отслеживания товара {title} подошел к концу. Вы можете продлить срок отслеживания или товар '
#                  f'{title} переместится в раздел Архив.')
#     discount_up = (f'Скидка на товар {title} увеличилась на {discount_difference}%. Вы можете перейти на страницу '
#                    f'магазина и купить товар {title} или дождаться повышения скидки до желаемой.')
#     find_discount = (f'Скидка на товар {title} увеличилась до желаемой {discount}%. Вы можете перейти в магазин '
#                      f'и купить товар.')




