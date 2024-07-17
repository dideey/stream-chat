from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer, LoginSerializer

class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success'}, status=status.HTTP_201_CREATED)
        return Response({'status': 'error', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                return Response({'status': f'Hello, {username} Welcome back!'}, status=status.HTTP_200_OK)
            return Response({'status': 'error', 'message': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'status': 'error', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'status': 'BYEEE!!!'}, status=status.HTTP_200_OK)


@csrf_exempt
def signup(request, method='POST'):
     if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'status': 'success'})
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
            return JsonResponse({'status': 'Hello, ' + username + ' Welcome back!'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid username or password'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

@csrf_exempt
def customlogout(request):
    logout(request)
    return JsonResponse({'status': 'BYEEE!!!'})
