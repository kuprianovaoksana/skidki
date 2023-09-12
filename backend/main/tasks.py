from datetime import datetime
from django.db.models import F, ExpressionWrapper, DateField
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.core import management
from config import settings
from skidkoman.models import Notification
from .models import Request
from django.db.models import Q
from celery import shared_task
from .models import Request, Notifications, Product
from .logic.user_request_search import ByUserRequest
from .logic.update_db import Magic


@shared_task
def create_email_notification(emails, title, discount, difference_discount, about):
    """
    context: контекст html шаблона письма
    """
    context = {
        'title': title,
        'discount': discount,
        'difference_discount': difference_discount,
        'notifi_type': about,
        'subject': 'Тема письма'
    }

    if about == 'find':
        template_name = 'email/success_request.html'

    elif about == 'changed':
        template_name = 'email/discount_up.html'

    for email in emails:
        send_email(email, context, template=template_name)


@shared_task
def create_lk_notification(lk_ids, title, discount, difference_discount, about):
    if about == 'find':
        text = (f'Скидка на товар {title} увеличилась до желаемой {discount}%. Вы можете перейти '
                f'в магазин и купить товар.')

    elif about == 'changed':
        text = (f'Скидка на товар {title} увеличилась на {difference_discount}%. Вы можете перейти на '
                f'страницу магазина и купить товар {title} или дождаться повышения скидки до желаемой.')

    notifications = []

    for request_id in lk_ids:
        notifications.append(Notification(request_id=request_id, text=text))

    Notification.objects.bulk_create(notifications)


@shared_task
def time_end_notification():
    """
    Периодическая задача, проверяет истечение срока отслеживания, направляет пользователям уведомление и меняет
    статус запроса на "Завершен"
    """
    date_now = datetime.now()
    end_requests = (Request.objects.filter(period_date__isnull=False, status='В работе')
                    .annotate(date_end=ExpressionWrapper(F('created_at') + F('period_date'), output_field=DateField()))
                    .filter(date_end__lt=date_now))

    request_notification = (end_requests.filter(Q(email_notification=True) | Q(lk_notification=True))
                            .select_related('user', 'product')
                            .only('user__email', 'product__title', 'email_notification', 'lk_notification'))

    notifications = []

    for request in request_notification:
        email = request.user.email if request.email_notification else None
        request_id = request.id if request.lk_notification else None
        title = request.product.title

        text = (f'Срок отслеживания товара {title} подошел к концу. Вы можете продлить срок '
                f'отслеживания или товар {title} переместится в Архив.')

        if email:
            template_name = 'email/end_time_tracker.html'
            email = request.user.email
            context = {
                'title': request.product.title,
                'subject': 'Тема письма'
            }
            send_email(email, context, template=template_name)

        if request_id:
            notifications.append(Notification(request_id=request_id, text=text))

    end_requests.update(complited_at=datetime.now(), status='В работе')
    Notification.objects.bulk_create(notifications)


def send_email(email, context, template=None):
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
