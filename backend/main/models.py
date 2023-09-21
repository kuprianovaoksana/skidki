from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser

from django_celery_beat.models import PeriodicTask

from .managers import UserManager


# from config import settings  # FIXME FOR SERVER


class Product(models.Model):
    title = models.CharField('Наименование товара', max_length=64)
    shop = models.CharField('Интернет-магазин', max_length=32, blank=True, null=True)
    description = models.CharField('Описание товара', max_length=5000, blank=True, null=True)
    old_price = models.CharField('Цена до скидки', max_length=32, blank=True, null=True)
    current_price = models.CharField('Цена со скидкой', max_length=32)
    url = models.URLField('URL товара', unique=True, primary_key=True)
    image = models.URLField('URL изображения', blank=True, null=True)
    brand = models.CharField('Бренд', max_length=32, blank=True, null=True)
    category = models.CharField('Категория', max_length=32, blank=True, null=True)
    click_rate = models.IntegerField('Рейтинг кликов', default=0, blank=True, null=True)


class ProductHistory(models.Model):
    product_id = models.ForeignKey("Product", on_delete=models.CASCADE)
    last_updated = models.DateTimeField("Последнее обновление цены", auto_now_add=True)
    updated_price = models.CharField("Обновленная цена", max_length=32)


class Request(models.Model):
    TYPE = (
        (0, 'Обо всех изменениях'),
        (1, 'Об увеличении скидки'),
        (2, 'О желаемой скидке'),
    )

    STATUS = (
        (0, 'В работе'),
        (1, 'Выполнен'),
        (2, 'Ошибка в URL'),
    )

    email_notification = models.BooleanField('Уведомление на почту', default=False)
    lk_notification = models.BooleanField('Уведомление в личном кабинете', default=False)
    notification_type = models.IntegerField('Тип уведомлений', choices=TYPE, default=0)
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user')  # FIXME FOR SERVER

    endpoint = models.URLField('Ссылка для отслеживания')
    price = models.IntegerField('Желаемая цена', blank=True, null=True)
    discount = models.IntegerField('Желаемая скидка', blank=True, null=True)
    created_at = models.DateField('Дата создания запроса', auto_now_add=True)
    completed_at = models.DateTimeField('Дата завершения запроса', default=None, blank=True, null=True)
    period_date = models.DateTimeField('Время отслеживания')
    status = models.IntegerField('Статус запроса', choices=STATUS, default=0)
    task = models.OneToOneField(PeriodicTask, null=True, blank=True, on_delete=models.CASCADE)


class Notifications(models.Model):
    request = models.ForeignKey('Request', on_delete=models.CASCADE, related_name='notification')
    text = models.CharField('Сообщение', max_length=256)
    created_at = models.DateField(auto_now_add=True)


# регистрация и вход только по email
class User(AbstractBaseUser, PermissionsMixin):
    GENDER = (
        ('M', 'Мужчина'),
        ('W', 'Женщина')
    )
    username = models.CharField('Логин', max_length=150, blank=True, null=True)
    email = models.EmailField('Эл. почта', null=True)
    date_joined = models.DateTimeField('Дата создания', auto_now_add=True)
    is_active = models.BooleanField('Активирован', default=True)  # обязательно
    is_staff = models.BooleanField('Персонал', default=False)  # для админ панели

    # заполняемые данные в профиле:
    phone = models.CharField('Номер телефона', max_length=30, blank=True)
    first_name = models.CharField('Имя', max_length=32, null=True)
    last_name = models.CharField('Фамилия', max_length=32, null=True)
    age = models.IntegerField('Возраст', null=True)
    gender = models.CharField('Пол', choices=GENDER, max_length=1, blank=True)
    city = models.CharField('Город', max_length=32, blank=True)
    description_user = models.CharField('О себе', max_length=512, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def change_email(self, new_email):
        if new_email:
            self.email = new_email
            self.username = self.email
            self.save()

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        unique_together = ['email', 'username']  # связка email+username уникальна
