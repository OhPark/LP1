from django.urls import path
from . import views


urlpatterns = [
    path('trends/', views.get_trends),
    path('search/', views.movie_search),
    path('<int:movie_pk>/', views.movie_detail),
    path('reviews/<int:review_pk>/', views.review_detail),
    path('<int:movie_pk>/reviews/create/', views.create_review),
]
