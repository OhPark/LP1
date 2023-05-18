from rest_framework import serializers
from .models import Movie, MovieCard, Review


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'


class MovieCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('title', 'poster_path', )


class ReviewSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Review
        fields = ('title', 'score')


class ReviewDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Review
        exclude = ('movie', )