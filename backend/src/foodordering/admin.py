from django.contrib import admin
from .models import *

admin.site.register(User)
admin.site.register(Food)
admin.site.register(Category)
admin.site.register(Order)
admin.site.register(OrderAddress)
admin.site.register(PaymentDetail)
admin.site.register(Review)
admin.site.register(FoodTracking)
admin.site.register(Wishlist)
# Register your models here.
