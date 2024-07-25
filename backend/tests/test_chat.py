import pytest
import asyncio
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
from backend.asgi import application
from django.test import override_settings

User = get_user_model()

@pytest.mark.django_db(transaction=True)
@pytest.mark.asyncio
@override_settings(TIME_ZONE='UTC', USE_TZ=True)
async def test_personal_chat_consumer():
    # Create test users
    try:
        print("Creating user1")
        user1 = await database_sync_to_async(User.objects.create_user)('user1', password='password')
        print(f"User1 created: {user1.id}")
    except Exception as e:
        print(f"Error creating user1: {e}")
        return

    try:
        print("Creating user2")
        user2 = await database_sync_to_async(User.objects.create_user)('user2', password='password')
        print(f"User2 created: {user2.id}")
    except Exception as e:
        print(f"Error creating user2: {e}")
        return


    # Generate the unique room name
    room_name = f"{min(user1.id, user2.id)}_{max(user1.id, user2.id)}"
    
    # Connect both users to the WebSocket server
    communicator1 = WebsocketCommunicator(application, f"/ws/streamchat/{room_name}/")
    communicator2 = WebsocketCommunicator(application, f"/ws/streamchat/{room_name}/")
    
    try:
        print(f"Connecting communicator1 to /ws/streamchat/{room_name}/")
        connected1, _ = await communicator1.connect()
        print(f"Connected1: {connected1}")
        
        print(f"Connecting communicator2 to /ws/streamchat/{room_name}/")
        connected2, _ = await communicator2.connect()
        print(f"Connected2: {connected2}")
        
        assert connected1
        assert connected2
        
        # User1 sends a message to the room
        message = {'message': 'Hello'}
        print(f"Sending message from communicator1: {message}")
        await communicator1.send_json_to(message)
        
        # User2 receives the message
        response = await communicator2.receive_json_from()
        print(f"Received message in communicator2: {response}")
        assert response['message'] == 'Hello'
    
    finally:
        print("Disconnecting communicators")
        await communicator1.disconnect()
        await communicator2.disconnect()
