from django.db import models
from django.conf import settings
import requests


class Trends(models.Model):
    title = models.CharField(max_length=100)
    poster_path = models.TextField()


class Movie:
    
    def __init__(self, response):
        self.id = response.data.id
        self.title = response.title
        self.overview = response.overview
        self.poster_path = response.poster_path
        self.release_date = response.release_date
        self.genre = response.genre
        self.vote_average = response.vote_average
        self.runtime = response.runtime


class Review(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)# user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

