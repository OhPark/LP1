from rest_framework import serializers
from .models import Article, Comment


class ArticleSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    # image = serializers.ImageField(use_url=True)

    class Meta:
        model = Article
        # fields = ('id', 'title', 'content', 'image',)
        fields = ('id', 'title', 'content', 'user_name', 'created_at', 'updated_at',)


class CommentSerializer(serializers.ModelSerializer):
    comments = ArticleSerializer(many=True, read_only=True)

    class Meta:

        model = Comment
        fields = ('content',)
