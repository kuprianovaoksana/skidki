from datetime import datetime
from django.db.models import F, ExpressionWrapper, DateField
from django.template.loader import render_to_string
from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from config import settings
from skidkoman.models import Notifications
from .models import Request


@shared_task
def to_email_notification(email, title, discount, difference_discount, notifi_type):
    context = {
        'title': title,
        'discount': discount,
        'difference_discount': difference_discount,
        'notifi_type': notifi_type,
        'subject': 'Тема письма'
    }

    if notifi_type == 'find':
        template__name = 'email/success_request.html'

    elif notifi_type == 'changed':
        template__name = 'email/discount_up.html'

    send_emails(email, context, template=template__name)


@shared_task
def create_lk_notification(request_id, title, discount, difference_discount, notifi_type):
    if notifi_type == 'find':
        text = (f'Скидка на товар {title} увеличилась до желаемой {discount}%. Вы можете перейти '
                f'в магазин и купить товар.')

    elif notifi_type == 'changed':
        text = (f'Скидка на товар {title} увеличилась на {difference_discount}%. Вы можете перейти на '
                f'страницу магазина и купить товар {title} или дождаться повышения скидки до желаемой.')
    else:
        return
    request = Request.objects.get(pk=request_id)
    Notifications.objects.create(request=request, text=text)


@shared_task
def time_end_notification():
    date_now = datetime.now()
    end_requests = (Request.objects.annotate(date_end=ExpressionWrapper(F('created_at') + F('period_date'),
                                                                        output_field=DateField()))
                    .filter(date_end__lt=date_now))

    email_notification = end_requests.filter(email_notification=True)
    lk_notification = end_requests.filter(lk_notification=True)

    for request in email_notification:
        template_name = 'email/end_time_tracker.html'
        email = request.user.email
        context = {
            'title': request.product.title,
            'subject': 'Тема письма'
        }
        send_emails(email, context, template=template_name)
        # request.end_tracker('Завершен')

    for request in lk_notification:
        text = (f'Срок отслеживания товара { request.product.title } подошел к концу. Вы можете продлить срок '
                f'отслеживания или товар { request.product.title } переместится в Архив.')
        Notifications.objects.create(request=request, text=text)
        # request.end_tracker('Завершен')


def send_emails(email, context, template=None):
    html_content = render_to_string(
        template_name=template,
        context=context,
    )

    msg = EmailMultiAlternatives(
        subject=context['subject'],
        body='',
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[email],
    )

    msg.attach_alternative(html_content, "text/html")
    msg.send()

