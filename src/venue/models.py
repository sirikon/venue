from django.db import models


class Talk(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()

    def __str__(self) -> str:
        return self.name


class Speaker(models.Model):
    name = models.CharField(max_length=200)
    title = models.TextField()
    image = models.ImageField(upload_to="speakers")

    def __str__(self) -> str:
        return self.name


class Track(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name
