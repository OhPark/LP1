from django.urls import path
from . import views


urlpatterns = [
    path('trends/', views.trends_list),
    # path('search/', views.search),
    path('movies/<int:movie_pk>/', views.movie_detail),
    path('movies/<int:movie_pk>/reviews/<int:review_pk>/', views.review_detail),
    path('movies/<int:movie_pk>/reviews/', views.create_review),
]
