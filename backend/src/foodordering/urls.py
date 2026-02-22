from django.contrib import admin
from django.urls import path
from .views import *
urlpatterns = [
    path('admin-login/',admin_login_api,name="admin_login"),
    path('add-category/',add_category,name="add_category"),
    path('categories/',list_categories,name="list_category"),
    path('add-food-item/',add_food_item, name="add_food_item"),
    path('foods/',list_foods,name="list_foods"),
    path('food_search/',food_search,name="food_search")
]
