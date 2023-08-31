from .models import Product, Request
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class RequestSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Request
        fields = (
            'user',
            'url',
            'price',
            'discount',
            'period_date',
        )


# class ProfileSerializer(serializers.ModelSerializer):
#     user = serializers.HiddenField(default=serializers.CurrentUserDefault())
#
#     class Meta:
#         model = Profile
#         fields = '__all__'


