from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout

from rest_framework import status
from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer, GroupSerializer, UserRegistrationSerializer, ProfileSerializer, ChatSerializer, GroupMessageSerializer, GroupMemberSerializer
from .models import Profile, Chat, ChatGroup, GroupMessage, GroupMember
from django.db.models import Q

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
    
class ProfileViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing user profiles.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def retrieve_profile(self, request):
        """
        Get a user profile by username.
        - URL: GET /profile/retrieve_profile/?username={username}
        - Permissions: Authenticated users only.
        - Request: username (as query parameter)
        - Response: User profile data.
        """
        username = request.query_params.get('username')
        if not username:
            return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(username=username)
            profile = user.profile
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Profile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    @action(detail=False, methods=['put'], permission_classes=[permissions.IsAuthenticated])
    def update_profile(self, request):
        """
        Update a user profile.
        - URL: PUT /profile/update_profile/
        - Permissions: Authenticated users only.
        - Request: bio, profile_pic.
        - Response: Updated profile data.
        """
        profile = request.user.profile
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_profile(self, request):
        """
        Get the profile of the logged-in user.
        - URL: GET /profile/my_profile/
        - Permissions: Authenticated users only.
        - Request: None.
        - Response: Logged-in user profile data.
        """
        profile = request.user.profile
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

class ChatViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing personal messages.
    """
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        This view should return a list of all the personal messages
        for the currently authenticated user.
        """
        return Chat.objects.filter(
            Q(sender=self.request.user) | Q(receiver=self.request.user)
        ).order_by('timestamp')

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response({'message': 'No messages found.'}, status=status.HTTP_204_NO_CONTENT)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def send_message(self, request):
        """
        Send a personal message to a specific user.
        - URL: POST /chat/send_message/
        - Permissions: Authenticated users only.
        - Request: receiver (username), content.
        - Response: Success or error status.
        """
        receiver_username = request.data.get('receiver')
        try:
            receiver = User.objects.get(username=receiver_username)
        except User.DoesNotExist:
            return Response({'status': 'error', 'message': 'Receiver does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(sender=self.request.user, receiver=receiver)
            return Response({'status': 'success', 'message': 'Message sent.'})
        return Response({'status': 'error', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def get_messages(self, request, username=None):
        """
        Retrieve all personal messages exchanged with a specific user.
        - URL: GET /chat/get_messages/?username={username}
        - Permissions: Authenticated users only.
        - Request: None (username is provided in the URL).
        - Response: List of messages.
        """
        username = request.query_params.get('username')
        if not username:
            return Response({'status': 'error', 'message': 'Username parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            other_user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'status': 'error', 'message': 'User does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

        messages = Chat.objects.filter(
            (Q(sender=request.user) & Q(receiver=other_user)) |
            (Q(sender=other_user) & Q(receiver=request.user))
        ).order_by('timestamp')

        page = self.paginate_queryset(messages)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(messages, many=True)
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
