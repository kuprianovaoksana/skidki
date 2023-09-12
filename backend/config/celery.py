import os

from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

app = Celery('config')
app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

app.conf.beat_schedule = {
    'end_tracker_notification': {
<<<<<<< HEAD
        'task': 'skidkoman.tasks.time_end_notification',
        'schedule': 5#crontab(minute='0', hour='0'),
=======
        'task': 'main.tasks.time_end_notification',
        'schedule': crontab(minute='0', hour='0'),
>>>>>>> origin/feature-union-api-and-scrapy
    },
}

app.conf.beat_schedule = {
    'executes_every_monday_at_night': {
        'task': 'main.tasks.by_week',
        'schedule': crontab(hour="3", minute="0", day_of_week='sunday'),  # TODO Uncomment this for real work.
        # 'schedule': crontab(minute='*/15'),  # TODO Test if it works correctly.
    },
}


@app.task(bind=True, ignore_result=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
