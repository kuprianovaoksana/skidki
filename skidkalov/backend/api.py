from rest_framework import generics
from rest_framework import permissions
from .serializers import ProductSerializer, RequestSerializer
from .models import Product, Request


class ProductCreate(generics.CreateAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class ProductList(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class UserRequestCreate(generics.CreateAPIView):
    serializer_class = RequestSerializer
    queryset = Request.objects.all()
    permission_classes = [permissions.IsAuthenticated]


class UserRequestRUD(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RequestSerializer
    queryset = Request.objects.all()


class UserRequestList(generics.ListAPIView):
    serializer_class = RequestSerializer
    queryset = Request.objects.all()



