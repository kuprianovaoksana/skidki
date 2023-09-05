from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from .models import Product, Request
from .tasks import task_success_request


@receiver(post_save, sender=Product)
def find_request(sender, instance, created, **kwargs):
    if not created:
        discount = instance.get_discount()
        price = instance.current_price
        find_discount = instance.product.filter(status='В работе').filter(discount__lte=discount)
        find_price = instance.product.filter(status='В работе').filter(price__gte=price)
        success_requests = find_price.union(find_discount)

        for request in success_requests:
            email = request.user.email
            task_success_request.apply_async((email, instance.title, instance.url,
                                              price, discount, request.price,
                                              request.discount))
            request.find_discount()
