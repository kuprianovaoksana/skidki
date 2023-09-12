from django.apps import AppConfig


class SkidkomanConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'main'

    def ready(self):
        from . import signals
