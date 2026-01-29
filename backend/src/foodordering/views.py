from django.shortcuts import render
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework.response import Response
# Create your views here.

@api_view(['POST'])
def admin_login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    admin_user = authenticate(username=username,password = password)
    if admin_user is not None and admin_user.is_staff:
        return Response({"message":"Login successful","username":username},status=200) #status 200 is for everthing is ok 
    return Response({"message":"Invalid Credentials"},status=401) #401 is for unauthorized
