from django.contrib import admin
from django.urls import path
from .views import *
urlpatterns = [
    path('admin-login/',admin_login_api,name="admin_login"),
    path('add-category/',add_category,name="add_category"),
    path('categories/',list_categories,name="list_category"),
    path('add-food-item/',add_food_item, name="add_food_item"),
    path('foods/',list_foods,name="list_foods"),
    path('food_search/',food_search,name="food_search"),
    path('random_foods/',random_foods),
    path('register/',register_user),
    path('login/',login_user),
    path('food/<int:id>/',food_detail),
    path('cart/add/',add_to_cart),
    path('cart/<int:user_id>/',get_cart_items),
    path('cart/update_quantity/', update_cart_quantity),
    path('cart/delete/<int:order_id>/',delete_cart_item),
    path('place_order/',place_order),
    path('orders/<int:user_id>/',my_orders),
    path('orders/by_order_number/<str:order_number>/', order_by_order_number),
    path('order_address/<str:order_number>/', get_order_address),
    path('invoice/<str:order_number>/',get_invoice),
    path('user_profile/<int:user_id>/',get_user_profile),
    path('user_profile/update/<int:user_id>/',update_user_profile),
    path('change_password/<int:user_id>/', change_password),
    path('orders-not-confirmed/',order_not_confirmed),
    path('orders-confirmed/',order_confirmed),
    path('order-being-prepared/',order_inProgress),
    path('order-pickup/', order_pickedup),
    path('orders-delivered/',order_delivered),
    path('order-cancelled/', order_cancelled),
    path('all-food/', all_orders),
    path('order-bw-dates/',order_bw_dates),
    path('view-order-detail/<str:order_no>/',view_order_detail),
    path('update-order-status/', update_order_status ),
    path('search-orders/', search_orders)

]
