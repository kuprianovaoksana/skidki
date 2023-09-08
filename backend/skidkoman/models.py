from datetime import datetime
from django.db import models
from config import settings
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from .managers import UserManager


class Product(models.Model):
    title = models.CharField('Наименование товара', max_length=64)
    shop = models.CharField('Интернет-магазин', max_length=32, blank=True)
    description = models.CharField('Описание товара', max_length=512, blank=True)
    old_price = models.IntegerField('Цена до скидки', null=True)
    current_price = models.IntegerField('Цена со скидкой', )
    url = models.URLField('URL товара', unique=True, db_index=True)
    image = models.URLField('URL изображения', blank=True)  # image url
    category = models.CharField('Категория', max_length=32, blank=True)
    brand = models.CharField('Бренд', max_length=32, blank=True)

    def set_category(self, category):  # TODO доделать с подбором аналогов
        self.category = category

    def get_discount(self):
        if self.old_price and self.current_price:
            return (1 - self.current_price / self.old_price) * 100

        return 0


class Request(models.Model):
    TYPE = (
        (0, 'Обо всех изменениях'),
        (1, 'Об увеличении скидки'),
        (2, 'О желаемой скидке'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user')
    # товар по какой-то причине исчез из БД, запрос пользователя не должен исчезнуть
    product = models.ForeignKey('Product', on_delete=models.SET_NULL, null=True, related_name='request')
    url = models.URLField('Ссылка для отслеживания')
    price = models.IntegerField('Желаемая цена', null=True)
    discount = models.IntegerField('Желаемая скидка', null=True)
    created_at = models.DateField('Дата создания запроса', auto_now_add=True)
    complited_at = models.DateField('Дата завершения запроса', default=None, null=True)
    period_date = models.DurationField('Время отслеживания', null=True)
    status = models.CharField('Статус запроса', max_length=8, default='В работе')
    email_notification = models.BooleanField('Уведомление на почту', default=False)
    lk_notification = models.BooleanField('Уведомление в личном кабинете', default=False)
    notification_type = models.IntegerField('Тип уведомлений', choices=TYPE, default=0)

    def end_tracker(self, status):
        self.created_at = datetime.now()
        self.status = status
        self.save()

    # def cancel_tracker(self):
    #     self.created_at = datetime.now()
    #     self.status = 'Отменен'
    #     self.save()

    def set_product(self, product: Product):
        self.product = product
        self.save()


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
    first_name = models.CharField('Имя', max_length=16, null=True)
    last_name = models.CharField('Фамилия', max_length=16, null=True)
    age = models.IntegerField('Возраст', null=True)
    gender = models.CharField('Пол', choices=GENDER, max_length=1, blank=True)
    city = models.CharField('Город', max_length=32, blank=True)
    description_user = models.CharField('О себе', max_length=512, blank=True)

    # будет реализовано в MVP2, пока не используется
    subscription = models.CharField('Тип подписки', max_length=16, default='FREE')

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
        unique_together = [['email']]
