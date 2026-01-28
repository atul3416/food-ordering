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
