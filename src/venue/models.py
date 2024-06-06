from django.db import models


class Talk(models.Model):
    name = models.TextField()
    description = models.TextField()
    date = models.DateTimeField()
