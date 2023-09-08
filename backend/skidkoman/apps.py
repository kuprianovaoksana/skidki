from django.apps import AppConfig


class SkidkomanConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'skidkoman'

    def ready(self):
        import skidkoman.signals