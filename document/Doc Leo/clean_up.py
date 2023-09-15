import time

import redis

red = redis.Redis(
    host="redis-16433.c8.us-east-1-3.ec2.cloud.redislabs.com",

    port=16433,

    password="P2esA8YJJqVFjdW1kgGxl1jGSqmFgxEd"
)

# To clean up the Redis database run this in a terminal
# py -i .\clean_up.py

for clean in range(5):
    time.sleep(3)
    print(red.flushdb())
