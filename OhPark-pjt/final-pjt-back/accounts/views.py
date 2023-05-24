from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import ProfileSerializer


User = get_user_model()

@api_view(['GET'])
def profile(request, username):
    # print(request.__dict__)
    # print('data', request.parsers[0].data)
    # print(request.data.username)
    user = get_object_or_404(User, username=username)
    print(user)
    serializer = ProfileSerializer(user)
    print(serializer.data)
    return Response(serializer.data)