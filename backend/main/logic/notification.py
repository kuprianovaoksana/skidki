from django.db.models import Q

from main.tasks import create_email_notification, create_lk_notification


def create_task_notification(qs, title, discount, difference_discount, about):
    """
    Функция create_task_notification отправляет уведомления пользователям на основе их предпочтений.

    :param qs:
        Набор запросов, содержащий отправляемые уведомления

    :param title:
        Название задачи или уведомления

    :param discount:
        Параметр «скидка» — это сумма скидки на уведомление о задаче

    :param difference_discount:
        Параметр «difference_discount» используется для представления разницы в скидке между текущей задачей и
        предыдущей задачей. Это числовое значение, которое указывает, насколько изменилась скидка.

    :param about:
        Параметр «about» — это описание или информация о создаваемой задаче/уведомлении
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
