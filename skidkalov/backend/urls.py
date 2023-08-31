from django.urls import include, path
from rest_framework import routers
from .api import ProductCreate, UserRequestCreate, UserRequestRUD, UserRequestList


urlpatterns = [
    path('product/create', ProductCreate.as_view(), name='product_create'),
    path('request/create/', UserRequestCreate.as_view(), name='request_create'),
    path('request/<int:pk>/update/', UserRequestRUD.as_view()),
    path('request/list/', UserRequestList.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]