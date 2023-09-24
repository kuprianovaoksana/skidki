from datetime import datetime

from django.db.models import Q
from django.core import management

from celery import shared_task
from django_celery_beat.models import PeriodicTask

from .logic.sender import send_email
from .logic.user_request_search import ByUserRequest
from .logic.update_db import Magic
from .models import Request, Notifications, Product


@shared_task
def create_email_notification(emails, title, discount, difference_discount, about):
    """
    Подготовка данных для email уведомления и запуск функции отправки почты
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
    """
    Формирует список объектов Notifications и одним запросом сохраняет их все в БД
    """
    if about == 'find':
        text = (f'Скидка на товар {title} увеличилась до желаемой {discount}%. Вы можете перейти '
                f'в магазин и купить товар.')

    elif about == 'changed':
        text = (f'Скидка на товар {title} увеличилась на {difference_discount}%. Вы можете перейти на '
                f'страницу магазина и купить товар {title} или дождаться повышения скидки до желаемой.')

    notifications = []

    for request_id in lk_ids:
        notifications.append(Notifications(request_id=request_id, text=text))

    Notifications.objects.bulk_create(notifications)


@shared_task
def time_end_notification():
    """
    Периодическая задача, проверяет истечение срока отслеживания, направляет пользователям уведомление и меняет
    статус запроса на "Завершен"
    """
    date_now = datetime.now()
    end_requests = (
        Request.objects.filter(period_date__isnull=False, status='В работе').filter(period_date__lt=date_now)
    )

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
            notifications.append(Notifications(request_id=request_id, text=text))

    Notifications.objects.bulk_create(notifications)


@shared_task
def by_week():
    """
    Функция `by_week` вызывает команду управления для запуска паука.
    """
    management.call_command('runspider')
    send_email('skidkoman777@yandex.ru',
               {"spider": 'Начинаем получать данные от парсера'},
               'email/week_parsing.html')


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
    task_obj = PeriodicTask.objects.get(name=request_obj.task.name)

    datetime_format = '%Y-%m-%d %H:%M:%S'
    date_format = '%Y-%m-%d'

    current_time = datetime.strptime(datetime.now().strftime(datetime_format), datetime_format)
    expiry_time = datetime.strptime(request_obj.period_date.strftime(datetime_format), datetime_format)
    completed_date = datetime.strptime(datetime.now().strftime(date_format), date_format)

    if current_time > expiry_time:
        task_obj.enabled = False
        task_obj.save()
        Request.objects.filter(pk=request_id).update(completed_at=completed_date, status=1, period_week="0")
        # print("Задача завершена")

    try:
        product_obj = Product.objects.get(pk=request_obj.endpoint)
    except Exception as e:
        task_obj.enabled = False
        task_obj.save()
        Request.objects.filter(pk=request_id).update(completed_at=completed_date, status=2, period_week="0")

        print(str(e), type(e))
        # print("Товар не найден")
    else:
        scraper = ByUserRequest(request_obj.endpoint)
        price = scraper.getting_price()

        abracadabra = Magic(price, product_obj)
        abracadabra.add_product_history()
        # print("Товар найден и выполняется операцией")
