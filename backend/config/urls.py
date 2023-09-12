from django.contrib import admin
from django.urls import path, include, re_path

from rest_framework import routers
from rest_framework import permissions
from drf_yasg import openapi
from drf_yasg.views import get_schema_view as swagger_get_schema_view

from main.viewsets import UserEmailChange, ProductHistoryViewSet, RequestViewSet

router = routers.DefaultRouter()
router.register(r"auth/users/me", UserEmailChange)
router.register(r"request", RequestViewSet)
router.register(r"history", ProductHistoryViewSet)

schema_view = swagger_get_schema_view(
    openapi.Info(
        title="Snippets API",
        default_version='v1',
        description="API description",
        terms_of_service="https://www.random.com/content/",
        contact=openapi.Contact(email="contact@random.com"),
        license=openapi.License(name="RND License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny, ],
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', include(router.urls)),

    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    re_path(r'^auth/', include('drf_social_oauth2.urls', namespace='drf')),

    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
