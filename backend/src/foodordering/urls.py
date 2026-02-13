from django.contrib import admin
from django.urls import path
from .views import *
urlpatterns = [
    path('admin-login/',admin_login_api,name="admin_login"),
    path('add-category/',add_category,name="add_category"),
    path('categories/',list_categories,name="list_category")
]
