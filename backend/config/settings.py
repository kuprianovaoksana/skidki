"""
Django settings for config project.

Generated by 'django-admin startproject' using Django 4.2.4.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""
import os
from pathlib import Path
from dotenv import load_dotenv, find_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # FIXME FOR SERVER

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-3x_4_vx_1se8@dwc%*y2lju$zu(&8y$#7p%wj)nj2_i!bg*b5p'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
# DEBUG = False  # FIXME FOR SERVER

ALLOWED_HOSTS = []
# ALLOWED_HOSTS = ["*"]  # FIXME FOR SERVER

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'djoser',
    'sslserver',
    'drf_yasg',
    'drf_social_oauth2',
    'social_django',
    'oauth2_provider',
    'rest_framework.authtoken',
    'django_celery_beat',
    'django_filters',

    'djangoscrapy',
    'main',
]

SITE_ID = 1

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect'
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {  # FIXME FOR TESTING
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# DATABASES = {  # FIXME FOR TESTING
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'railway',
#         'USER': 'postgres',
#         'PASSWORD': 'gah3vjLGvwQeX9REeQGS',
#         'HOST': 'containers-us-west-175.railway.app',
#         'PORT': '7174',
#     }
# }

# DATABASES = {  # FIXME FOR SERVER
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': os.getenv('DB_NAME'),
#         'USER': os.getenv('DB_USER'),
#         'PASSWORD': os.getenv('DB_PASSWORD'),
#         'HOST': os.getenv('DB_HOST'),
#         'PORT': os.getenv('DB_PORT'),
#     }
# }

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators
AUTH_USER_MODEL = 'main.User'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = False
# USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'
# STATIC_ROOT = os.path.join(BASE_DIR, 'static/')  # FIXME FOR SERVER

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# DRF
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
        'drf_social_oauth2.authentication.SocialAuthentication',
    ),

    # 'DEFAULT_PERMISSION_CLASSES': [  # FIXME FOR SERVER
    #     'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    # ],

    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 5
}

DJOSER = {
    'LOGIN_FIELD': 'email',
    'PASSWORD_RESET_CONFIRM_URL': 'auth/password/reset/confirm/{uid}/{token}',
    'USERNAME_RESET_CONFIRM_URL': 'auth/username/reset/confirm/{uid}/{token}',
    'ACTIVATION_URL': 'auth/activate/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': True,
    'SERIALIZERS': {
        'current_user': 'main.serializers.CustomUserSerializer'
    },
    'USER_CREATE_PASSWORD_RETYPE': True,
    'SET_PASSWORD_RETYPE': True,
}

EMAIL_CHANGE_CONFIRM_URL = 'auth/change/email/{uid}/{token}'

# EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
DEFAULT_FROM_EMAIL = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST = 'smtp.yandex.ru'
EMAIL_PORT = 465
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
EMAIL_USE_SSL = True

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = os.getenv('SOCIAL_AUTH_GOOGLE_OAUTH2_KEY')
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = os.getenv('SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET')
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
]

SOCIAL_AUTH_VK_OAUTH2_KEY = os.getenv('SOCIAL_AUTH_VK_OAUTH2_KEY')
SOCIAL_AUTH_VK_OAUTH2_SECRET = os.getenv('SOCIAL_AUTH_VK_OAUTH2_SECRET')
SOCIAL_AUTH_VK_APP_USER_MODE = 2

SOCIAL_AUTH_YANDEX_OAUTH2_KEY = os.getenv('SOCIAL_AUTH_VK_OAUTH2_KEY')
SOCIAL_AUTH_YANDEX_OAUTH2_SECRET = os.getenv('SOCIAL_AUTH_VK_OAUTH2_SECRET')

AUTHENTICATION_BACKENDS = (
    'social_core.backends.yandex.YandexOAuth2',
    'social_core.backends.vk.VKOAuth2',
    'social_core.backends.google.GoogleOAuth2',
    'drf_social_oauth2.backends.DjangoOAuth2',
    'main.backends.AuthBackend',
)

# Если вы используете Redis Labs, то переменные CELERY_BROKER_URL и CELERY_RESULT_BACKEND должны строиться по шаблону:
#       redis://логин:пароль@endpoint:port

CELERY_BROKER_URL = f'redis://default:P2esA8YJJqVFjdW1kgGxl1jGSqmFgxEd' \
                    f'@redis-16433.c8.us-east-1-3.ec2.cloud.redislabs.com:16433'

CELERY_RESULT_BACKEND = f'redis://default:P2esA8YJJqVFjdW1kgGxl1jGSqmFgxEd' \
                        f'@redis-16433.c8.us-east-1-3.ec2.cloud.redislabs.com:16433'

CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_BROKER_CONNECTION_RETRY_ON_STARTUP = True

# ISSUES NOTIFICATION

# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#
#     'formatters': {
#         'simple_0': {
#             "format": "[{asctime}], [{levelname}], [{message}]",
#             "style": "{",
#         },
#         'simple_1': {
#             "format": "[{asctime}], [{levelname}], [{module}], [{message}]",
#             "style": "{",
#         },
#         'simple_2': {
#             "format": "[{asctime}], [{levelname}], [{message}], [{pathname}]",
#             "style": "{",
#         },
#         'simple_3': {
#             "format": "[{asctime}], [{levelname}], [{message}], [{pathname}], [{exc_info}]",
#             "style": "{",
#         },
#     },
#
#     'filters': {
#         'require_debug_true': {
#             '()': 'django.utils.log.RequireDebugTrue',
#         },
#         'require_debug_false': {
#             '()': 'django.utils.log.RequireDebugFalse',
#         },
#     },
#
#     'handlers': {
#         'console_I': {  # WORKING ONLY ON DEBUG = False
#             'level': 'INFO',
#             'class': 'logging.FileHandler',
#             'filename': 'general.log',
#             'formatter': 'simple_1',
#             'filters': ['require_debug_false'],
#         },
#         'console_D': {  # WORKING ONLY ON DEBUG = True
#             'level': 'DEBUG',
#             'class': 'logging.StreamHandler',
#             'formatter': 'simple_0',
#             'filters': ['require_debug_true'],
#         },
#         'console_W': {  # WORKING ONLY ON DEBUG = True
#             'level': 'WARNING',
#             'class': 'logging.StreamHandler',
#             'formatter': 'simple_2',
#             'filters': ['require_debug_true'],
#         },
#         'console_E_C': {  # WORKING ONLY ON DEBUG = True
#             'level': 'ERROR',
#             'class': 'logging.StreamHandler',
#             'formatter': 'simple_3',
#             'filters': ['require_debug_true'],
#         },
#         'console_E_C_TO_F': {  # WORKING EVERY
#             'level': 'ERROR',
#             'class': 'logging.FileHandler',
#             'filename': 'errors.log',
#             'formatter': 'simple_3'
#         },
#         'security': {  # WORKING EVERY
#             # 'level': 'ERROR',
#             'class': 'logging.FileHandler',
#             'filename': 'security.log',
#             'formatter': 'simple_1'
#         },
#         'mail_001': {  # WORKING ONLY ON DEBUG = False
#             'level': 'ERROR',
#             'class': 'django.utils.log.AdminEmailHandler',
#             'formatter': 'simple_2',
#             'filters': ['require_debug_false'],
#             # "include_html": True  # If you need html problem type
#         },
#     },
#
#     'loggers': {
#         'django': {
#             'handlers': ['console_I', 'console_D', 'console_W', 'console_E_C'],
#             'propagate': True,
#         },
#         'django.security': {
#             'handlers': ['security'],
#             'propagate': True,
#         },
#         'django.request': {
#             'handlers': ['console_E_C_TO_F', 'mail_001'],
#             'propagate': True,
#         },
#         'django.server': {
#             'handlers': ['console_E_C_TO_F', 'mail_001'],
#             'propagate': True,
#         },
#         'django.template': {
#             'handlers': ['console_E_C_TO_F'],
#             'propagate': True,
#         },
#         'django.db.backends': {
#             'handlers': ['console_E_C_TO_F'],
#             'propagate': True,
#         },
#     }
# }
