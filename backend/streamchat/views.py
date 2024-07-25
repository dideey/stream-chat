from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout

@csrf_exempt
def signup(request, method='POST'):
     if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'status': 'success', 'message': 'User created successfully'})
        else:
            return JsonResponse({'status': 'error', 'errors': form.errors})
     return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

@csrf_exempt
def customlogin(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return JsonResponse({'status': 'success', 'message': 'Hello, ' + username + ' Welcome back!'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid username or password'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

@csrf_exempt
def customlogout(request):
    logout(request)
    return JsonResponse({'status': 'success', 'message': 'BYEEE!!!'})
