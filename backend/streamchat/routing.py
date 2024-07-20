from django.urls import path
from . import consumers
websocket_urlpatterns = [
    path(r'ws/chat/(?P<room_name>\w+)/$', consumers.PersonalChat.as_asgi()),
    path(r'ws/chat/group/(?P<group_name>\w+)/$', consumers.GroupChat.as_asgi()),
]