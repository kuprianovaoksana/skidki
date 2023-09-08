import os
from celery import Celery
from celery.schedules import crontab


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

app = Celery('config')
app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

app.conf.beat_schedule = {
    'end_tracker_notification': {
        'task': 'skidkoman.tasks.time_end_notification',
        'schedule': crontab(minute='0', hour='0'),
    },
}