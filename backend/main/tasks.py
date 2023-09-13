from datetime import datetime

from django.db.models import F, ExpressionWrapper, DateField
from django.core import management

from celery import shared_task
from celery import current_task
from django_celery_beat.models import PeriodicTask

from .logic.sender import send_emails
from .logic.user_request_search import ByUserRequest
from .logic.update_db import Magic
from .models import Request, Notifications, Product


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


@shared_task
def by_week():
    """
    Функция `by_week` вызывает команду управления для запуска паука.
    """
    management.call_command('runspider')


@shared_task(bind=True)
def task_monitor(self, request_id):
    """
    Функция Task_monitor проверяет, истек ли срок действия задачи, при необходимости отключает ее, обновляет статус
    связанного запроса и выполняет некоторые операции над объектом продукта.

    :param request_id:
        Параметр request_id — это идентификатор объекта запроса, который вы хотите отслеживать.
        Он используется для получения конкретного объекта запроса из базы данных
    """
    request_obj = Request.objects.get(pk=request_id)

    task_action = PeriodicTask.objects.get(name=request_obj.task.name)  # THIS OBJECT IS TO STOP THE TASK.

    task_time = current_task.request  # THIS OBJECT IS FOR CACHE EXPIRY TIME.

    formatted_time = datetime.strptime(task_time.expires.replace("T", " "), '%Y-%m-%d %H:%M:%S')

    if datetime.now() > formatted_time:
        task_action.enabled = False
        task_action.save()
        Request.objects.filter(pk=request_id).update(completed_at=datetime.now(), status=1)

    try:
        product_obj = Product.objects.get(pk=request_obj.endpoint)
    except Exception as e:  # FIXME OFFER ALTERNATIVE PRODUCT
        task_action.enabled = False
        task_action.save()

        Request.objects.filter(pk=request_id).update(completed_at=datetime.now(), status=2)

        print(str(e), type(e))
    else:
        scraper = ByUserRequest(request_obj.endpoint)
        price = scraper.getting_price()

        abracadabra = Magic(price, product_obj)
        abracadabra.add_product_history()
