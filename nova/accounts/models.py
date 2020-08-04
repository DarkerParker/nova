from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from django.urls import reverse
import uuid

from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    is_subscribed = models.BooleanField(default=False)
    image = models.ImageField(upload_to="profile",default="profile/no-img.png")
    thumbnail_image = models.ImageField(upload_to="thumbnail",default="thumbnail/no-thumbnail-img.png")
    pass