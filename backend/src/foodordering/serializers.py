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
    is_available = serializers.BooleanField(required=False,default=True)
    class Meta:
        model = Food
        fields = ['id','category','category_name','item_name','item_description','price','item_quantity','is_available','image']


class CartOrderSerializer(serializers.ModelSerializer):
    food = FoodSerializer()
    class Meta:
        model = Order
        fields = ['id','food','quantity']


class MyOrdersListSerializer(serializers.ModelSerializer):
    order_final_status = serializers.SerializerMethodField()
    class Meta:
        model = OrderAddress
        fields = ['order_number', 'order_time', 'order_final_status']
    def get_order_final_status(self, obj):
        return obj.order_final_status or "Wait for Restaurant confirmation"
    

class OrderSerializer(serializers.ModelSerializer):
    food = FoodSerializer()
    class Meta:
        model = Order
        fields = ['food','quantity']

    

class OrderAddressSerializer(serializers.ModelSerializer):
    payment_mode = serializers.SerializerMethodField()
    class Meta:
        model = OrderAddress
        fields = ['order_number','address','payment_mode', 'order_time', 'order_final_status']


    def get_payment_mode(self, obj):
        try:
            payment = PaymentDetail.objects.get(order_number = obj.order_number)
            return payment.payment_mode
        except: 
            return None
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'