#convert django model to json called serialization . when json is converted into model called deserialization

from rest_framework import serializers
from .models import *
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','category_name','create_date']