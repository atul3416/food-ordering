from django.db import models

# Create your models here.

class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=255,unique=True)
    mobile = models.IntegerField()
    password = models.CharField(max_length=100)
    reg_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    


class Category(models.Model):
    category_name = models.CharField(max_length=50)
    create_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.category_name)
    
class Food(models.Model):
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    item_name = models.CharField(max_length=50)
    price = models.FloatField()
    item_description = models.TextField(null=True,blank=True)
    image = models.ImageField(upload_to='food_images/',null=True)
    item_quantity = models.CharField(max_length=50)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.item_name} {self.item_quantity}"
    

class Order(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    food = models.ForeignKey(Food,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    is_order_placed = models.BooleanField(default=False)
    order_number = models.CharField(max_length=100,null=True)

    def __str__(self):
        return f"{self.order_number} {self.user}"


class OrderAddress(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    order_number = models.CharField(max_length=100,null=True)
    address = models.TextField()
    order_time = models.DateTimeField(auto_now_add=True)
    order_final_status = models.CharField(max_length=200,null=True)

    def __str__(self):
        return f"{self.order_number} {self.user}"
    

class FoodTracking(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE)
    remark = models.CharField(max_length=100, null=True)
    status = models.CharField(max_length=200,null=True)
    status_date = models.DateTimeField(auto_now_add=True)
    order_cancelled_by_user = models.BooleanField(null=True)

    def __str__(self):
        return f"{self.order.order_number} - {self.status}"
    
class PaymentDetail(models.Model):
    PAYMENT_CHOICES = [
        ('COD', 'Cash on Delivery'),
        ('ONLINE', 'Online Payment')
    ]

    user = models.ForeignKey(User,on_delete=models.CASCADE)
    order_number = models.CharField(max_length=100,null=True)
    payment_mode = models.CharField(max_length=20,choices=PAYMENT_CHOICES)
    card_number = models.CharField(max_length=100,null=True, blank=True)
    expiry_date = models.CharField(max_length=20,null=True)
    cvv =  models.CharField(max_length=5,null=True, blank=True)
    payment_date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.order_number} {self.payment_mode}"
    


class Review(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    food = models.ForeignKey(Food,on_delete=models.CASCADE)
    rating = models.PositiveBigIntegerField(default=1)
    comment = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Reviewd by {self.user.first_name} for {self.food.item_name} - {self.rating}"
    

       
class Wishlist(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    food = models.ForeignKey(Food,on_delete=models.CASCADE)
    added_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user','food')
    
    def __str__(self):
        return f"{self.user.first_name} {self.food.item_name}"
    