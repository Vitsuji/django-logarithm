from django.db import models
from django.utils import timezone

class Post(models.Model):
    title = models.CharField(max_length=120)
    published = models.DateTimeField(default=timezone.now)
