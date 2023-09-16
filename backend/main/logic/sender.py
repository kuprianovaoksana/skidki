from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives

from config import settings


def send_email(email, context, template=None):
    """
    Функция send_emails отправляет электронное письмо с содержимым HTML на указанный адрес электронной почты.

    :param email:
            Параметр "email"— это адрес электронной почты получателя.

    :param context:
            Параметр "context" — это словарь, содержащий данные, необходимые для отображения шаблона электронной почты.
            Обычно он включает такие переменные, как тема электронного письма, имя получателя и любой другой
            динамический контент, который необходимо включить в электронное письмо.

    :param template:
            Параметр "template" — это имя файла HTML-шаблона, который будет использоваться для создания содержимого
            электронной почты. Этот шаблон должен храниться в каталоге шаблонов вашего проекта.
    """
    html_content = render_to_string(
        template_name=template,
        context=context,
    )

    msg = EmailMultiAlternatives(
        subject=context.get('subject', None),
        body='',
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[email],
    )

    msg.attach_alternative(html_content, "text/html")
    msg.send()
