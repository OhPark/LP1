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
from .models import Movie, Review
from .serializers import MovieSerializer, MovieCardSerializer, ReviewSerializer, ReviewDetailSerializer
import datetime

api_key = '6234433679f922dfecdc04d1126b17ad'
base_url = 'https://api.themoviedb.org/3/'


def get_object_or_none_pk(model, *args, **kwargs):
    if model.objects.filter(id=args).exists():
        return model.objects.get(id=args)
    else:
        return None
    
    
def get_list_or_none(model, **kwargs):
    if model.exists():
        return model.objects.all()
    else:
        return None


@api_view(['GET'])
def movie_detail(request, movie_pk):        
    if request.method == 'GET':
        movie = get_object_or_none_pk(Movie, movie_pk)

        if movie == None or \
            datetime.date.today() - movie.updated_at >= datetime.timedelta(days=1):
            # url = base_url + f'movie/{movie_pk}?language=ko'
            # headers = {
            #     "accept": "application/json",
            #     "Authorization": f"Bearer {api_key}"
            # }
            # response = http_requests.get(url, headers=headers)

            url = base_url + f'movie/{movie_pk}?api_key={api_key}&language=ko'
            response = http_requests.get(url)

            if response.status_code != 200:
                print('not 200')
                return Response(status=status.HTTP_404_NOT_FOUND)
            movie = Movie(response.json())
            serializer = MovieSerializer(movie)
            serializer.save()
        else:
            serializer = MovieSerializer(movie)

        print(datetime.date.today())
        print(movie.updated_at)
        print(datetime.date.today() - movie.updated_at >= datetime.timedelta(days=1))

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
            movies_obj.append(Movie(movie))

        serializer = MovieCardSerializer(movies_obj, many=True)
        return Response(serializer.data)


# 이녀석의 요청은 front의 localStorage에 따라 할지 말지 정한다.
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
            trends_obj.append(Movie(trend))
        serializer = MovieCardSerializer(trends_obj, many=True)
        return Response(serializer.data)


# movie detail 아래에 review list에서 create 버튼 누르면 router로 review create 페이지 라우팅
# 거기서 form tag submit.prevent 하고 submit 할시 이 view 호출하는 url로 요청 ㄱㄱ
# @permission_classes([IsAuthenticated])
@api_view(['POST'])
def create_review(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    if request.method == 'POST':
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(movie=movie)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


# @permission_classes([IsAuthenticated])
@api_view(['GET', 'DELETE', 'PUT'])
def review_detail(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    
    if request.method == 'GET':
        serializer = ReviewDetailSerializer(review)
        return Response(serializer.data)
    
    elif request.method == 'DELETE':
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    elif request.method == 'PUT':
        serializer = ReviewDetailSerializer(review, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

