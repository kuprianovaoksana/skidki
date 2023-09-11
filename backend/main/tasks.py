from datetime import datetime

from django.db.models import F, ExpressionWrapper, DateField
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.core import management

from config import settings

from celery import shared_task

from .models import Request, Notifications, Product
from .logic.user_request_search import ByUserRequest
from .logic.update_db import Magic


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
        text = (f'Срок отслеживания товара {request.product.title} подошел к концу. Вы можете продлить срок '
                f'отслеживания или товар {request.product.title} переместится в Архив.')
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


@shared_task
def by_week():
    """
    Функция `by_week` вызывает команду управления для запуска паука.
    """
    management.call_command('runspider')


@shared_task(bind=True)
def task_monitor(self, request_id):
    """
    Функция Task_monitor извлекает запрос и объект продукта на основе заданного идентификатора запроса,
    а затем использует парсер для получения цены продукта и добавляет ее в историю продукта.

    :param request_id:
        Параметр request_id — это первичный ключ объекта Request, который мы хотим отслеживать.
        Он используется для получения конкретного запроса из базы данных
    """
    try:
        request_obj = Request.objects.get(pk=request_id)
        product_obj = Product.objects.get(pk=request_obj.endpoint)
    except Exception as e:  # TODO DELETE THE TASK.
        print(str(e), type(e))  # TODO OFFER AN ALTERNATIVE PRODUCT FROM THE BRAND.
    else:
        scraper = ByUserRequest(request_obj.endpoint)
        price = scraper.getting_price()

        abracadabra = Magic(price, product_obj)
        abracadabra.add_product_history()
