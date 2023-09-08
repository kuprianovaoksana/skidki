from django.urls import include, path, re_path
from rest_framework import routers
from .api import (ProductCreate, RequestCreate, RequestRUD,
                  RequestList, UserEmailChange,)
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('auth/users/me', UserEmailChange)

urlpatterns = [
    path('product/create', ProductCreate.as_view(), name='product_create'),
    path('request/create/', RequestCreate.as_view(), name='request_create'),
    path('request/<int:pk>/update/', RequestRUD.as_view()),
    path('request/list/', RequestList.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
urlpatterns += router.urls
