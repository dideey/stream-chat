from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.customlogin, name='login'),
    path('logout/', views.customlogout, name='logout'),

]
