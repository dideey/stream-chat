from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=1000, blank=True)
    profile_pic = models.ImageField(upload_to='profile_pics', blank=True)

    def __str__(self):
        return self.user.username


class Chat(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField(max_length=1000)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user
    
    class meta:
        ordering=('timestamp',)

class ChatGroup(models.Model):
    group_name=models.CharField(max_length=100)

    def __str__(self):
        return self.group_name

class GroupMessage(models.Model):
    group=models.ForeignKey(ChatGroup, on_delete=models.CASCADE)
    author=models.ForeignKey(User, on_delete=models.CASCADE)
    body=models.TextField(max_length=1000)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author
    
    class meta:
        ordering=('created_at',)

class GroupMember(models.Model):
    group=models.ForeignKey(ChatGroup, on_delete=models.CASCADE)
    user=models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user