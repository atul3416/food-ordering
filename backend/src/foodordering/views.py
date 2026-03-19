from django.shortcuts import render
from rest_framework.decorators import api_view , parser_classes
from django.contrib.auth import authenticate
from rest_framework.response import Response
from .models import *
# Create your views here.

@api_view(['POST'])
def admin_login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    admin_user = authenticate(username=username,password = password)
    if admin_user is not None and admin_user.is_staff:
        return Response({"message":"Login successful","username":username},status=200) #status 200 is for everthing is ok 
    return Response({"message":"Invalid Credentials"},status=401) #401 is for unauthorized

@api_view(['POST'])
def add_category(request):
    category_name = request.data.get('category_name')
    Category.objects.create(category_name = category_name)
    return Response({"message": "Category added successfully"},status=201)

from .serializers import *
@api_view(['GET'])
def list_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories,many=True)
    return Response(serializer.data)
    


from rest_framework.parsers import MultiPartParser, FormParser

@api_view(['POST'])
@parser_classes([MultiPartParser,FormParser])
def add_food_item(request):
    serializer = FoodSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Food Item has been added successfully"},status=201)
    return Response({"message": "Somethign went wrong"},status=400)


@api_view(['GET'])
def list_foods(request):
    foods = Food.objects.all()
    serializer = FoodSerializer(foods,many=True)
    return Response(serializer.data)



@api_view(['GET'])
def food_search(request):
    query = request.GET.get('q','')
    foods = Food.objects.filter(item_name__icontains = query)
    serializer = FoodSerializer(foods,many=True)
    return Response(serializer.data)

import random
@api_view(['GET'])
def random_foods(request):
    foods = list(Food.objects.all())
    random.shuffle(foods)
    limited_foods = foods[0:9]
    serializer = FoodSerializer(limited_foods,many=True)
    return Response(serializer.data)

from django.contrib.auth.hashers import make_password
@api_view(['POST'])
def register_user(request):
    f_name = request.data.get('firstname')
    l_name = request.data.get('lastname')
    mobile = request.data.get('mobileno')
    email = request.data.get('email')
    password = request.data.get('password')
    if User.objects.filter(email = email).exists() or User.objects.filter(mobile = mobile).exists():
        return Response({"message": "Email or Mobile no are already register"},status=400)
    User.objects.create(first_name = f_name, last_name = l_name, email = email , mobile = mobile, password = make_password(password))
    return Response({"message": "User registered successfully"},status=201)