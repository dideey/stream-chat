from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout


from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer, GroupSerializer, UserRegistrationSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def signup(self, request):
        """
        Register a new user.
        - URL: POST    /users/signup/
        - Permissions: Public (no authentication required).
        - Request: username, password, email, etc.
        - Response: Success or error status.
        """
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success'})
        return Response({'status': 'error', 'errors': serializer.errors})

    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def login(self, request):
        """
        Log in a user.
        - URL: POST    /users/login/
        - Permissions: Public (no authentication required).
        - Request: username, password.
        - Response: Welcome message or error.
        """
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return Response({'status': f'Hello, {username}! Welcome back!'})
        return Response({'status': 'error', 'message': 'Invalid username or password'})

    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def logout(self, request):
        """
        Log out the current user.
        - URL: POST    /api/users/logout/
        - Permissions: Authenticated users only.
        - Request: None.
        - Response: Logout message.
        """
        logout(request)
        return Response({'status': 'BYEEE!!!'})

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        """
        Get the details of the current user.
        - URL: GET    /users/me/
        - Permissions: Authenticated users only.
        - Request: None.
        - Response: User details.
        """
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]



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
