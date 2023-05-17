from django.urls import path, include
from . import views

urlpatterns = [
    path('trends/', views.trends_list),
    # path('search/', views.search),
    path('movie/<int:movie_pk>/', views.movie_detail),
    path('movie/<int:movie_pk>/reviews/<int:review_pk>', views.review_detail),
    path('movie/<int:movie_pk>/reviews/', views.create_review),
]
