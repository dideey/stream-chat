from django.urls import path
from django.contrib.auth import views as auth_views
from . import views
from .views import SignupView, LoginView, LogoutView

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.customlogin, name='login'),
    path('logout/', views.customlogout, name='logout'),

    path('api/signup/', SignupView.as_view(), name='signup'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
]
