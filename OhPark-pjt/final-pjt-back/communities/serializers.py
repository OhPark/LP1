from rest_framework import serializers
from .models import Article, Comment


class ArticleSerializer(serializers.ModelSerializer):

    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Article
        fields = ('id', 'title', 'content', 'image',)


class CommentSerializer(serializers.ModelSerializer):
    class Meta:

        model = Comment
        fields = ('content',)
