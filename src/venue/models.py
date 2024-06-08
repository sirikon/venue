from django.db import models


class Track(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name


class Speaker(models.Model):
    name = models.CharField(max_length=200)
    title = models.TextField()
    image = models.ImageField(upload_to="speakers")

    def __str__(self) -> str:
        return self.name


class Talk(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    description = models.TextField(blank=True)
    date = models.DateTimeField()
    speakers = models.ManyToManyField(Speaker)
    track = models.ForeignKey(Track, on_delete=models.RESTRICT)

    def __str__(self) -> str:
        return self.name


class Question(models.Model):
    talk = models.ForeignKey(Talk, on_delete=models.CASCADE)
    visitor = models.UUIDField()
    question = models.TextField()


class Rating(models.Model):
    talk = models.ForeignKey(Talk, on_delete=models.CASCADE)
    visitor = models.UUIDField()
    rating = models.PositiveSmallIntegerField()
    comment = models.TextField()
