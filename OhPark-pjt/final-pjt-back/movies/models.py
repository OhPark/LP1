from django.db import models
from django.conf import settings


class Trends(models.Model):
    title = models.CharField(max_length=100)
    poster_path = models.TextField()


class Genre(models.Model):
    name = models.CharField(max_length=20)


class Movie(models.Model):
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=100)
    overview = models.TextField()
    poster_path = models.TextField()
    release_date = models.DateTimeField()
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    vote_average = models.FloatField()
    runtime = models.IntegerField()


class Review(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)

