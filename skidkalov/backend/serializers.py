from .models import Product, Request
from rest_framework import serializers
from django.contrib.auth import get_user_model
from djoser.serializers import UidAndTokenSerializer


User = get_user_model()


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class RequestSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Request
        fields = [
            'user',
            'url',
            'price',
            'discount',
            'period_date',
        ]


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'phone',
            'first_name',
            'last_name',
            'age',
            'gender',
            'city',
            'description_user',
        ]


class UserEmailSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email']
