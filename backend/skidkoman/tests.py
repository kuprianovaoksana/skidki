from django.test import TestCase

# Create your tests here.
"""
python manage.py shell
from skidkoman.models import *
p1 = Product.objects.create(title='Ноутбук', current_price=20000, old_price=30000, url='http1')
p2 = Product.objects.create(title='Телевизор', current_price=50000, url='http2')
p3 = Product.objects.create(title='Телефон', current_price=100000, old_price=120000, url='http3')
u1 = User.objects.create(email='lolo@mail.ru')
u2 = User.objects.create(email='lolo2@mail.ru')
u3 = User.objects.create(email='lolo3@mail.ru')
u4 = User.objects.create(email='lolo4@mail.ru')
r1 = Request.objects.create(user=u1, product=p1, url='http1', discount=35)
r2 = Request.objects.create(user=u2, product=p1, url='http1', price=18000)
r3 = Request.objects.create(user=u3, product=p2, url='http2', discount=10)
r4 = Request.objects.create(user=u4, product=p3, url='http3', price=90000)

python manage.py shell
from skidkoman.models import *
p1 = Product.objects.get(id=1)
p2 = Product.objects.get(id=2)
p3 = Product.objects.get(id=3)
u1 = User.objects.get(id=1)
u2 = User.objects.get(id=2)
u3 = User.objects.get(id=3)
u4 = User.objects.get(id=4)
r1 = Request.objects.get(id=1)
r2 = Request.objects.get(id=2)
r3 = Request.objects.get(id=3)
r4 = Request.objects.get(id=4)

p1 = Product.objects.get(url='http1')
p1.current_price = 10000
p1.save()

"""