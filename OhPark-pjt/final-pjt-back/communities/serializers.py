from rest_framework import serializers
from .models import Article, Comment


class CommentSerializer(serializers.ModelSerializer):
    comment_username = serializers.CharField(source='user.username', read_only=True)

    class Meta:

        model = Comment
        fields = ('id', 'content', 'comment_username',)


class ArticleSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    user_count = serializers.IntegerField(source='like_users.count', read_only=True)
    # image = serializers.ImageField(use_url=True)

    class Meta:
        model = Article
        # fields = ('id', 'title', 'content', 'image',)
        fields = ('id', 'title', 'content', 'user_name', 'created_at', 'updated_at', 'comments', 'like_users', 'user_count',)
        read_only_fields = ('like_users',)