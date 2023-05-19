from django.db import models
from django.conf import settings


class Article(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='articles')
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="like_articles")

    dislike_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="dislike_articles")
    
    title = models.CharField(max_length=50)
    content = models.TextField()
    image = models.ImageField(null=True, upload_to="uploads/", blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    

class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='comments')
    
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)