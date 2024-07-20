from django.contrib import admin
from .models import *

admin.site.register(Chat)
admin.site.register(ChatGroup)
admin.site.register(GroupMessage)
admin.site.register(GroupMember)
admin.site.register(Profile)