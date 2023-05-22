from django.db import models
from django.conf import settings
import requests


class Movie(models.Model):
    
    id = models.IntegerField(primary_key=True, unique=True)
    title = models.CharField(max_length=100)
    overview = models.TextField(null=True)
    poster_path = models.TextField(null=True)
    release_date = models.TextField(null=True)
    genres = models.JSONField(default=list)
    vote_average = models.DecimalField(null=True, max_digits=6, decimal_places=3)
    runtime = models.IntegerField(null=True)
    updated_at = models.DateField(auto_now=True)

    # def __init__(self, response):
    #     self.id = response.get('id')
    #     self.title = response.get('title')
    #     self.overview = response.get('overview')
    #     self.poster_path = response.get('poster_path')
    #     self.release_date = response.get('release_date')
    #     self.genres = response.get('genres')
    #     self.vote_average = response.get('vote_average')
    #     self.runtime = response.get('runtime')

    #     return super().__init__(response)


# nested로 Movie (detail) 불러올 때 출력해야 함.
class Review(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    score = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # DB table에 우리의 객체들이 어떻게 저장되는지, 어떻게 유지되는지 확인 후 바꾸어야 함.
    # on_delete 속성을 바꿔야 할 수 있음.
    # foreignkey로서 사용을 못하게 될 수 있기에, 이곳에 우리가 request에서 받은 movie_id를 받는
    # field로서 이용하고, movie detail 받아올 때 같이 찾는 식으로 해야할 수 있다.
    # 이러면 client에 부담을 많이 주는데, 우리의 DB에 많은 양을 받을 수 없기에 불가피한 상황이다.
    # 우리의 web이 기업단위로 개발되고, Server의 퀄리티가 올라가야 DB에 data를 양껏 담을 수 있고,
    # 이 조건이 충족되어야 movie를 ForeingnKey로서 이용, 우리의 DB에 영화정보와 연결할 수 있다 판단된다.

    # movie = models.IntegerField()

    # 다 취소. 실제 배포 및 서비스 하는 서버라 생각하고 개발
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

