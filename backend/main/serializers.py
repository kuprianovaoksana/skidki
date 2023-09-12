from django.contrib.auth import get_user_model

from rest_framework import serializers

from .models import Request, ProductHistory

User = get_user_model()


class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        read_only_fields = ("id", "created_at", "task")
        fields = '__all__'


class ProductHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductHistory
        read_only_fields = ("id", "last_updated")
        fields = '__all__'


class CustomUserSerializer(serializers.ModelSerializer):
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
