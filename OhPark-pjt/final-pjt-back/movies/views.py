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
from .serializers import MovieSerializer, MovieCardSerializer, ReviewSerializer, ReviewDetailSerializer

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


@api_view(['GET'])
def review_list(request, movie_pk):
    if request.method == 'GET':
        reviews = get_list_or_404(Review)
        movie_reviews = []
        for review in reviews:
            if movie_pk == review.movie:
                movie_reviews.append(review)
        serializer = ReviewSerializer(movie_reviews, many=True)
        return Response(serializer.data)


# movie detail 아래에 review list에서 create 버튼 누르면 router로 review create 페이지 라우팅
# 거기서 form tag submit.prevent 하고 submit 할시 이 view 호출하는 url로 요청 ㄱㄱ
# @permission_classes([IsAuthenticated])
@api_view(['POST'])
def create_review(request, movie_pk):
    if request.method == 'POST':
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(movie=movie_pk)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


# @permission_classes([IsAuthenticated])
@api_view(['GET', 'DELETE', 'PUT'])
def review_detail(request, movie_pk, review_pk):
    review = Review.object.get(pk=review_pk)
    
    if request.method == 'GET':
        serializer = ReviewDetailSerializer(review)
        return Response(serializer.data)
    
    elif request.method == 'DELETE':
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    elif request.method == 'PUT':
        serializer = ReviewDetailSerializer(review, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(movie=movie_pk)
            return Response(serializer.data, status=status.HTTP_200_OK)

