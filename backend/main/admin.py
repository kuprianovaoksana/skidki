from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import (Category,
                     Brand,
                     Shop,
                     Product,
                     ProductHistory,
                     Request,
                     Notifications)

User = get_user_model()


@admin.register(User)
class PersonAdmin(admin.ModelAdmin):
    pass


admin.site.register(Product)
admin.site.register(ProductHistory)
admin.site.register(Request)
admin.site.register(Notifications)
admin.site.register(Category)
admin.site.register(Brand)
admin.site.register(Shop)
