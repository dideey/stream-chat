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
from .serializers import UserSerializer, ChatGroupSerializer, UserRegistrationSerializer, ProfileSerializer, ChatSerializer, GroupMessageSerializer, GroupMemberSerializer
from .models import Profile, Chat, ChatGroup, GroupMessage, GroupMember
from django.shortcuts import get_object_or_404
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
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def search_user(self, request):
        """
        Search for users by username.
        - URL: GET /chat/search_user/?query=<username>.
        - Permissions: Authenticated users only.
        - Response: List of users matching the query.
        """
        query = request.query_params.get('query', None)
        if not query:
            return Response({'status': 'error', 'message': 'Query parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)

        users = User.objects.filter(username__icontains=query)
        if not users.exists():
            return Response({'status': 'error', 'message': 'No users found matching the query.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows viewing, creating, and managing groups.
    """
    queryset = ChatGroup.objects.all().order_by('group_name')
    serializer_class = ChatGroupSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        This view should return a list of all the groups
        for the currently authenticated user.
        """
        return ChatGroup.objects.filter(groupmember__user=self.request.user).distinct()
    
    def create(self, request, *args, **kwargs):
        """
        Create a new group.
        - URL: POST /group/
        - Permissions: Authenticated users only.
        - Request: group_name.
        - Response: Created group data.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            group = serializer.save()
            GroupMember.objects.create(group=group, user=request.user)  # Ajouter le créateur comme membre
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def list(self, request, *args, **kwargs):
        """
        Retrieve all groups.
        - URL: GET /group/
        - Permissions: Authenticated users only.
        - Request: None.
        - Response: List of groups.
        """
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def update(self, request, pk=None, *args, **kwargs):
        """
        Update a specific group.
        - URL: PUT /group/{pk}/
        - Permissions: Authenticated users only.
        - Request: group_name.
        - Response: Updated group data.
        """
        queryset = self.get_queryset()
        group = get_object_or_404(queryset, pk=pk)
        serializer = self.get_serializer(group, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None, *args, **kwargs):
        """
        Delete a specific group.
        - URL: DELETE /group/{pk}/
        - Permissions: Authenticated users only.
        - Request: None.
        - Response: None.
        """
        queryset = self.get_queryset()
        group = get_object_or_404(queryset, pk=pk)
        group.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def get_groups(self, request):
        """
        Retrieve all groups.
        - URL: GET /group/get_groups/
        - Permissions: Authenticated users only.
        - Request: None.
        - Response: List of groups.
        """
        groups = self.get_queryset()
        serializer = self.get_serializer(groups, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def get_members(self, request, pk=None):
        """
        Retrieve all members of a specific group.
        - URL: GET /group/get_members/{pk}/
        - Permissions: Authenticated users only.
        - Request: None.
        - Response: List of members.
        """
        group = get_object_or_404(ChatGroup, pk=pk)
        members = GroupMember.objects.filter(group=group)
        serializer = GroupMemberSerializer(members, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def get_messages(self, request, pk=None):
        """
        Retrieve all messages in a specific group.
        - URL: GET /group/get_messages/{pk}/
        - Permissions: Authenticated users only.
        - Request: None.
        - Response: List of messages.
        """
        group = get_object_or_404(ChatGroup, pk=pk)
        messages = GroupMessage.objects.filter(group=group)
        serializer = GroupMessageSerializer(messages, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def get_user_messages(self, request):
        """
        Retrieve all messages sent by the authenticated user.
        - URL: GET /group/get_user_messages/
        - Permissions: Authenticated users only.
        - Request: None.
        - Response: List of messages.
        """
        user = request.user
        messages = GroupMessage.objects.filter(author=user)
        serializer = GroupMessageSerializer(messages, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def get_user_groups(self, request):
        """
        Retrieve all groups where the authenticated user is a member.
        - URL: GET /group/get_user_groups/
        - Permissions: Authenticated users only.
        - Request: None.
        - Response: List of groups.
        """
        user = request.user
        groups = ChatGroup.objects.filter(groupmember__user=user)
        serializer = self.get_serializer(groups, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def send_message(self, request, pk=None):
        """
        Send a message to a specific group.
        - URL: POST /group/send_message/{pk}/
        - Permissions: Authenticated users only.
        - Request: body.
        - Response: Created group message.
        """
        group = get_object_or_404(ChatGroup, pk=pk)
        user = request.user
        serializer = GroupMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(group=group, author=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def retrieve_group(self, request, pk=None, *args, **kwargs):
        """
        Retrieve a specific group.
        - URL: GET /group/retrieve_group/{pk}/
        - Permissions: Authenticated users only.
        - Request: None.
        - Response: Group data.
        """
        queryset = self.get_queryset()
        group = get_object_or_404(queryset, pk=pk)
        serializer = self.get_serializer(group)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def add_member(self, request, pk=None):
        """
        Add a member to a specific group.
        - URL: POST /group/add_member/{pk}/
        - Permissions: Authenticated users only.
        - Request: None.
        - Response: Created group member.
        """
        group = get_object_or_404(ChatGroup, pk=pk)
        user_id = request.data.get('user_id')
        if not user_id:
            return Response({'error': 'user_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        user = get_object_or_404(User, pk=user_id)
        GroupMember.objects.create(group=group, user=user)
        return Response({'status': 'success', 'message': 'Member added'}, status=status.HTTP_201_CREATED)


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
