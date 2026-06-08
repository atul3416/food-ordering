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

class OrderSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderAddress
        fields = ['id', 'order_time', 'order_number']

class OrderDetailSerializer(serializers.ModelSerializer):
    user_first_name = serializers.CharField(source = 'user.first_name')
    user_last_name = serializers.CharField(source = 'user.last_name')
    user_email = serializers.CharField(source = 'user.email')
    user_mobile = serializers.CharField(source = 'user.mobile')
    class Meta:
        model = OrderAddress
        fields = ['order_number', 'order_time', 'order_final_status', 'address', 'user_first_name',
                   'user_last_name','user_email', 'user_mobile']
        

class OrderFoodSerializer(serializers.ModelSerializer):
    item_price = serializers.CharField(source = 'food.price')
    item_name = serializers.CharField(source = 'food.item_name')
    image = serializers.ImageField(source = 'food.image') 
    class Meta:
        model = Order
        fields = ['item_name', 'item_price', 'image', 'quantity']


class FoodTrackingSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodTracking
        fields = '__all__'