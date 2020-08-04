from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'is_subscribed']

CustomUserAdmin.fieldsets += ('Membership', {'fields': ('is_subscribed', 'image', 'thumbnail_image')}),

admin.site.register(CustomUser, CustomUserAdmin)