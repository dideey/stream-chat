#The personalchat will handle the websocket connections, receive messages from users and send them to intended recipients.
#A clientside logic needs to be added to enable websocket connection
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

class PersonalChat(AsyncWebsocketConsumer):
    async def connect(self):
        """Called when the websocket is handshaking as part of the connection process
            (when websocket connection is attempted)
        """
        self.user = self.scope['user']
        if self.user.is_authenticated:
            self.user_room_name = self.scope['url_route']['kwargs']['room_name']
            await self.channel_layer.group_add(
                self.user_room_name,
                self.channel_name
            )
            await self.accept()
        else:
            await self.close()
    
    async def disconnect(self, close_code):
        """called when the websocket closes
            Args:
                close_code: Reason why the websocket was closed
        """
        if self.user.is_authenticated:
            await self.channel_layer.group_discard(
                self.user_room_name,
                self.channel_name
            )

    async def receive(self, text_data):
        """Called when message is received from websocket
            Args:
                text_data: message received from the websocket in json format
        """
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        receiver_id = text_data_json['recepient']

        room_name = self.generate_room_name(self.user.id, receiver_id)

        await self.channel_layer.group_send(
            room_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender_id': self.user.id
            }
        )

    async def chat_message(self, event):
        """Called when message is received from room group
            Args:
                event: message received from the room group
        """
        message = event['message']
        sender_id = event['sender_id']

        await self.send(text_data=json.dumps({
            'message': message,
            'sender_id': sender_id
        }))
    
    def generate_room_name(self, user_id, recepient_id):
        """creates a unique room name for one-to-one chat
            Args:
                user_id: id of the user
                recepient_id: id of the recepient
            Returns:
                str: unique room name
        """
        ids = sorted([user_id, recepient_id])
        return f'personal_chat_{ids[0]}_{ids[1]}'

class GroupChat(AsyncWebsocketConsumer):
    async def connect(self):
        """Connects user to a unique room for group messages
        """
        self.user = self.scope['user']
        if self.user.is_authenticated:
            self.group_name = f'group_user_{self.user.id}'
            await self.channel_layer.group_add(
                self.group_name,
                self.channel_name
            )
            await self.accept()
        else:
            await self.close()
    
    async def disconnect(self, close_code):
        """called when the websocket closes
            Args:
                close_code: Reason why the websocket was closed
        """
        if self.user.is_authenticated:
            await self.channel_layer.group_discard(
                self.group_name,
                self.channel_name
            )

    async def receive(self, text_data):
        """Called when message is received from websocket
            Args:
                text_data: message received from the websocket in json format
        """
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender_id': self.user.id
            }
        )

    async def chat_message(self, event):
        """Called when message is received from room group
            Args:
                event: message received from the room group
        """
        message = event['message']
        sender_id = event['sender_id']

        await self.send(text_data=json.dumps({
            'message': message,
            'sender_id': sender_id
        }))