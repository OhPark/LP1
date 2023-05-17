import requests as http_requests
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Authentication Decorators
from rest_framework.decorators import authentication_classes

# permission Decorators
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework import status
from django.shortcuts import get_object_or_404, get_list_or_404
from .models import Movie, Review, Trends
from .serializers import MovieSerializer, ReviewSerializer

api_key = 'f1feebfe99ae40de68afb2c6303af665'
base_url = f'https://api.themoviedb.org/3/'


@api_view(['GET'])
def movie_detail(request, movie_pk):        
    if request.method == 'GET':
        url = base_url + f'movie/{movie_pk}?language=ko'

        headers = {
            "accept": "application/json",
            "Authorization": "Bearer f1feebfe99ae40de68afb2c6303af665"
        }
        response = http_requests.get(url, headers=headers)

        if response.status_code != 200:
            return Response(status=status.HTTP_404_NOT_FOUND)
            
        movie = Movie(response.json())
        serializer = MovieSerializer(movie)
        return Response(serializer.data)


@api_view(['GET'])
def movie_search(request, movie_pk):        
    start_date = request.start_date
    end_date = request.end_date
    keyword = request.keyword
    if request.method == 'GET':
        url = base_url + f"discover/movie?language=ko&page=1&primary_release_date.gte={start_date}%7B%7D&primary_release_date.lte={end_date}&sort_by=popularity.desc&with_keywords={keyword}"

        headers = {
            "accept": "application/json",
            "Authorization": "Bearer f1feebfe99ae40de68afb2c6303af665"
        }

        response = http_requests.get(url, headers=headers)

        try:
            movies = MovieSearch(response.text)
            serializer = MovieSearchSerializer(movies)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


# @permission_classes([IsAuthenticated])
@api_view(['POST'])
def create_review(request):
    if request.method == 'POST':
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def review_detail(reqeust, review_pk):
    pass

