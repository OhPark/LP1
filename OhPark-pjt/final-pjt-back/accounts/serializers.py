from rest_framework import serializers
from django.contrib.auth import get_user_model
from communities.models import Article
from movies.models import Movie, Review

User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):

    class ArticleSerializer(serializers.ModelSerializer):

        class Meta:
            model = Article
            fields = '__all__'

    class MovieSerializer(serializers.ModelSerializer):

        class Meta:
            model = Movie
            fields = '__all__'

    class ReviewSerializer(serializers.ModelSerializer):

        class Meta:
            model = Review
            fields = '__all__'
    
    like_articles = ArticleSerializer(many=True)
    articles = ArticleSerializer(many=True)

    class Meta:
        model = User
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'username')