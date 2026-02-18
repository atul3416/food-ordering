#convert django model to json called serialization . when json is converted into model called deserialization

from rest_framework import serializers
from .models import *
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','category_name','create_date']

class FoodSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.category_name',read_only=True)
    image = serializers.ImageField(required = False)
    class Meta:
        model = Food
        fields = ['id','category','category_name','item_name','item_description','price','item_quantity','is_available','image']