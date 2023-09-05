from django.template.loader import render_to_string
from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from skidkalov import settings


@shared_task
def task_success_request(email, title, url, product_price, product_discount, request_price, request_discount):
    html_content = render_to_string(
        'email/success_request.html',
        {
            'title': title,
            'product_price': product_price,
            'request_price': request_price,
            'link': url,
            'product_discount': product_discount,
            'request_discount': request_discount,
        }
    )
    find_price = 'На Ваш товар установлена желаемая цена!'
    find_discount = 'Ваш товар продается с желаемой скидкой!',

    msg = EmailMultiAlternatives(
        subject=find_price if request_price else find_discount,
        body='',
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[email],
    )
    msg.attach_alternative(html_content, "text/html")
    msg.send()
