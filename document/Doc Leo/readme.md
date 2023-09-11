## The command you should use ↓

### By your straight request in main spider directory ↓

```
scrapy crawl `name` -o file_name.json

scrapy crawl `name`
```

### As per your request in django directory ↓

```
py manage.py runspider
```

### To run celery week plan ↓

```
Run these commands in three different windows ↓

1. py manage.py runserver

2. celery -A config worker -l INFO --pool=solo

3. celery -A config beat -l INFO
```

### Run the user request task ↓

```
1. py manage.py runserver

2. celery -A config worker --loglevel=info -P gevent --concurrency 1 -E

3. celery -A config beat -l INFO --scheduler django_celery_beat.schedulers:DatabaseScheduler --max-interval 10
```

### Recommended rules to use project ↓

1. Clean up Redis database after testing - see more details. \MVP1\clean_up.py\
2. Don't delete the example.py file, the spider is a template !
3. Don't delete the current file !

### How to add site to scraping system ↓

###### ATTENTION: If you don't know how to do this, leave this idea !

1. add a new CrawlSpider to this folder \MVP1\Skidkoman\djangoscrapy\djangoscrapy\spiders\
2. add a new site to this file \MVP1\Skidkoman\main\logic\sitetags.py\