from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import Product, ProductHistory, Request

User = get_user_model()


@admin.register(User)
class PersonAdmin(admin.ModelAdmin):
    pass


admin.site.register(Product)
admin.site.register(ProductHistory)
admin.site.register(Request)
