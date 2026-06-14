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

from django.db.models import Q
from django.contrib.auth.hashers import check_password
@api_view(['POST'])
def login_user(request):
    identity = request.data.get('emailcont')
    password = request.data.get('password')
    try:
        if identity.isdigit():
            user = User.objects.filter(mobile=int(identity)).first()
        else:
            user = User.objects.filter(email=identity).first()
        if check_password(password,user.password):
            return Response({"message": "Login Successfull","userId": user.id, "userName" : f"{user.first_name} {user.last_name}"},status=200)
        else:
            return Response({"message": "Invalid Crediatials"}, status=401)
    except:
         return Response({"message": "Invalid Crediatials"}, status=401)
    
    
@api_view(['GET'])
def food_detail(request,id):
    food = Food.objects.get(id=id)
    serializer = FoodSerializer(food)
    return Response(serializer.data)


@api_view(['POST'])
def add_to_cart(request):
    user_id = request.data.get("userId")
    food_id = request.data.get("foodId")

    try:
        user = User.objects.get(id=user_id)
        food = Food.objects.get(id=food_id)

        # order,created = Order.objects.get_or_create(
        #     user = user,
        #     food = food,
        #     is_order_placed= False,
        #     #defaults = {'quantity':1}
        #     quantity = 1,
        # )

        # if not created :
        #     order.quantity += 1
        #     order.save()
        if Order.objects.filter(user = user, food=food, is_order_placed = False).exists():
            order = Order.objects.get(user = user, food=food, is_order_placed = False)
            order.quantity += 1
            order.save()
        else:
            Order.objects.create(
                user = user,
                food = food,
                is_order_placed= False,
                #defaults = {'quantity':1}
                quantity = 1,
            )
        return Response({"message":"Food added to card successfully"},status=200) #status 200 is for everthing is ok 
    except:
        return Response({"message":"Something went wr"},status=401) #401 is for unauthorized
    


@api_view(['GET'])
def get_cart_items(request,user_id):
    orders = Order.objects.filter(user_id = user_id,is_order_placed=False).select_related('food')
    serializer = CartOrderSerializer(orders,many=True)
    return Response(serializer.data)


@api_view(['PUT'])
def update_cart_quantity(request):
    order_id = request.data.get('orderId')
    quantity = request.data.get('quantity')
    try:
        order = Order.objects.get(id=order_id, is_order_placed=False)
        order.quantity = quantity
        order.save()
        return Response({"message": "quantity updated successfully"},status = 200)
    except:
        return Response({"message":"Something went wrong"}, status = 404)


@api_view(['DELETE'])
def delete_cart_item(request,order_id):
    try:
        order = Order.objects.get(id=order_id, is_order_placed=False)
        order.delete()
        return Response({"message": "quantity updated successfully"},status = 200)
    except:
        return Response({"message":"Something went wrong"}, status = 404)


def make_unique_order_number():
    while True:
        num = str(random.randint(100000000, 999999999))
        if not OrderAddress.objects.filter(order_number = num).exists():
            return num
        
    

@api_view(['POST'])
def place_order(request):
    user_id = request.data.get('userId')
    address = request.data.get('address')
    payment_mode = request.data.get('paymentMode')
    card_number = request.data.get('cardNumber')
    expiry = request.data.get('expiry')
    cvv = request.data.get('cvv')

    try:
        order = Order.objects.filter(user_id = user_id, is_order_placed=False)

        order_number = make_unique_order_number()

        order.update(order_number = order_number, is_order_placed=True)

        OrderAddress.objects.create(
            user_id = user_id,
            order_number = order_number,
            address = address
        )

        PaymentDetail.objects.create(
            user_id = user_id,
            order_number = order_number,
            payment_mode = payment_mode,
            card_number = card_number if payment_mode == 'online' else None,
            expiry_date = expiry if  payment_mode == 'online' else None,
            cvv =  cvv if payment_mode == 'online' else None
        )
        return Response({"message": f'Order placed successfully! Order No: {order_number}'}, status = 201)
    except Exception as e:
        print(e)
        return Response({"message": "Something went wrong"}, status=404)



@api_view(['GET'])
def my_orders(request,user_id):
    orders = OrderAddress.objects.filter(user_id = user_id,).order_by('-id')
    serializer = MyOrdersListSerializer(orders,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def order_by_order_number(request,order_number):
    orders = Order.objects.filter(order_number =  order_number, is_order_placed = True).select_related('food')
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_order_address(request,order_number):
    order_address = OrderAddress.objects.get(order_number =  order_number)
    serializer = OrderAddressSerializer(order_address)
    return Response(serializer.data)

from django.shortcuts import render
def get_invoice(request,order_number):
    orders = Order.objects.filter(order_number = order_number, is_order_placed = True).select_related('food')
    address = OrderAddress.objects.get(order_number = order_number)
    grandTotal = 0
    order_data = []
    for order in orders:
        total_price = order.food.price * order.quantity
        grandTotal += total_price
        order_data.append({
            'food': order.food,
            'quantity': order.quantity,
            'total_price' : total_price,
        })
    
    return render(request, 'invoice.html', {
        'order_number': order_number,
        'order_data' : order_data,
        'address' : address,
        'grandTotal' : grandTotal
    })
        
@api_view(['GET'])
def get_user_profile(request, user_id):
    user = User.objects.get(id = user_id)
    serializers = UserSerializer(user)
    return Response(serializers.data)


@api_view(['PUT'])
def update_user_profile(request,user_id):
    user = User.objects.get(id=user_id)
    serializers = UserSerializer(user,data=request.data, partial=True)
    if serializers.is_valid():
        serializers.save()
        return Response({"message":"Profile Updated Successfully"}, status=200)
    return Response(serializers.error, status=400)


@api_view(['POST'])
def change_password(request, user_id):
    user = User.objects.get(id = user_id)
    current_pass = request.data.get('current_password')
    new_pass = request.data.get('new_password')

    if not check_password(current_pass, user.password):
        return Response({"message":"Current password is incorrect"}, status = 400)
    
    user.password = make_password(new_pass)
    user.save()
    return Response({"message":"Password changed successfully"}, status = 200)


@api_view(['GET'])
def order_not_confirmed(request):
    order = OrderAddress.objects.filter(order_final_status__isnull=True).order_by('-order_time')
    serializers = OrderSummarySerializer(order, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def order_confirmed(request):
    order = OrderAddress.objects.filter(order_final_status = "Order Confirmed").order_by('-order_time')
    serializers = OrderSummarySerializer(order, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def order_inProgress(request):
    order = OrderAddress.objects.filter(order_final_status = "Food being Prepared").order_by('-order_time')
    serializers = OrderSummarySerializer(order, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def order_pickedup(request):
    order = OrderAddress.objects.filter(order_final_status = 'Order Pickup').order_by('-order_time')
    serializers = OrderSummarySerializer(order, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def order_delivered(request):
    order = OrderAddress.objects.filter(order_final_status = 'Order Delivered').order_by('-order_time')
    serializers = OrderSummarySerializer(order, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def order_cancelled(request):
    order = OrderAddress.objects.filter(order_final_status = 'Order Cancelled').order_by('-order_time')
    serializers = OrderSummarySerializer(order, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def all_orders(request):
    order = OrderAddress.objects.all().order_by('-order_time')
    serializers = OrderSummarySerializer(order, many=True)
    return Response(serializers.data)

@api_view(['POST'])
def order_bw_dates(request):
    from_date = request.data.get('fromDate')
    to_date = request.data.get('toDate')
    status = request.data.get('status')
    orders = OrderAddress.objects.filter(order_time__date__range = [from_date,to_date])
    if status == 'Not Confirmed':
        orders = orders.filter(order_final_status__isnull = True)
    elif status != 'all':
        orders = orders.filter(order_final_status = status)
    
    serializers = OrderSummarySerializer(orders.order_by('-order_time'),many = True)
    return Response(serializers.data, status=200)


@api_view(['POST'])
def order_bw_dates(request):
    from_date = request.data.get('fromDate')
    to_date = request.data.get('toDate')
    status = request.data.get('status')
    orders = OrderAddress.objects.filter(order_time__date__range = [from_date,to_date])
    if status == 'Not Confirmed':
        orders = orders.filter(order_final_status__isnull = True)
    elif status != 'all':
        orders = orders.filter(order_final_status = status)
    
    serializers = OrderSummarySerializer(orders.order_by('-order_time'),many = True)
    return Response(serializers.data, status=200)


@api_view(['POST'])
def order_bw_dates(request):
    from_date = request.data.get('fromDate')
    to_date = request.data.get('toDate')
    status = request.data.get('status')
    orders = OrderAddress.objects.filter(order_time__date__range = [from_date,to_date])
    if status == 'Not Confirmed':
        orders = orders.filter(order_final_status__isnull = True)
    elif status != 'all':
        orders = orders.filter(order_final_status = status)
    
    serializers = OrderSummarySerializer(orders.order_by('-order_time'),many = True)
    return Response(serializers.data, status=200)


@api_view(['GET'])
def view_order_detail(request,order_no):
    try:   
        order_address = OrderAddress.objects.select_related('user').get(order_number =  order_no)
        ordered_food = Order.objects.filter(order_number = order_no).select_related('food')
        tracking = FoodTracking.objects.filter(order__order_number = order_no)
    except:
        return Response({"error":"Something went wrong"}, status = 404)
    return Response({
        'order': OrderDetailSerializer(order_address).data,
        'food': OrderFoodSerializer(ordered_food, many=True).data,
        'tracking': FoodTrackingSerializer(tracking, many=True).data
    })

@api_view(['POST'])
def update_order_status(request):
    order_number = request.data.get('order_number')
    new_status = request.data.get('status')
    remark = request.data.get('remark')

    try:
        address = OrderAddress.objects.get(order_number = order_number)
        order = Order.objects.filter(order_number = order_number).first()
        if not order:
            return Response({'error':"Order not found"}, status = 404)
        FoodTracking.objects.create(
            order = order,
            remark = remark,
            status = new_status,
            order_cancelled_by_user = False
        )
        address.order_final_status = new_status
        address.save()
        return Response({'message':'Order status update successfully'})
    except:
        return Response({'error':'Invalid order number.'}, status= 400)
    


@api_view(['GET'])
def search_orders(request):
    query = request.GET.get('q','')
    print(query)
    if query:
        orders = OrderAddress.objects.filter(order_number__icontains=query)
        print(orders)
    else:
        orders = []
    serializer = OrderSummarySerializer(orders,many=True)
    return Response(serializer.data)


@api_view(['GET','PUT','DELETE'])
def category_detail(request,id):
    try:
        category = Category.objects.get(id=id)
    except Category.DoesNotExist:
        return Response({'error':'Category Not Found'}, status=404)
    
    if request.method == 'GET':
        serializer = CategorySerializer(category)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CategorySerializer(category,data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response({'message':'Category updated successfully'}, status=200)
    elif request.method == 'DELETE':
        category.delete()
        return Response({'message':'Category deleted successfully'}, status=200)
