import requests as http_requests
from urllib import parse

from rest_framework.response import Response
from rest_framework.decorators import api_view
# Authentication Decorators
from rest_framework.decorators import authentication_classes

# permission Decorators
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework import status
from django.shortcuts import get_object_or_404, get_list_or_404
from .models import Movie, MovieCard, Review
from .serializers import MovieSerializer, MovieCardSerializer,ReviewSerializer

api_key = '6234433679f922dfecdc04d1126b17ad'
base_url = 'https://api.themoviedb.org/3/'


@api_view(['GET'])
def movie_detail(request, movie_pk):        
    if request.method == 'GET':
        # url = base_url + f'movie/{movie_pk}?language=ko'
        url = base_url + f'movie/{movie_pk}?api_key={api_key}&language=ko'

        # headers = {
        #     "accept": "application/json",
        #     "Authorization": f"Bearer {api_key}"
        # }

        # response = http_requests.get(url, headers=headers)
        response = http_requests.get(url)
        # print(response)
        if response.status_code != 200:
            print('not 200')
            return Response(status=status.HTTP_404_NOT_FOUND)
        # print(response.json())
        movie = Movie(response.json())
        serializer = MovieSerializer(movie)
        return Response(serializer.data)


@api_view(['GET'])
def movie_search(request):        
    query = parse.quote(request.query)
    if request.method == 'GET':
        url = base_url + f"search/movie?query={query}&api_key={api_key}&include_adult=false&language=ko&page=1"
        response = http_requests.get(url)

        if response.status_code != 200:
            print(response.status_code)
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        movies = response.json().get('results')

        movies_obj = []
        for movie in movies:
            movies_obj.append(MovieCard(movie))

        serializer = MovieCardSerializer(movies_obj, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def get_trends(request):
    if request.method == 'GET':
        url = base_url + f'trending/movie/week?api_key={api_key}&language=ko'
        response = http_requests.get(url)

        if response.status_code != 200:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        trends = response.json().get('results')
        trends_obj = []
        print(trends)
        for trend in trends:
            trends_obj.append(MovieCard(trend))
        serializer = MovieCardSerializer(trends_obj, many=True)
        return Response(serializer.data)


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
    if reqeust.method == 'GET':
        # serializer = RevieDetailSerializer(data=request.data)
        pass

