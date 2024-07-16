from django.contrib import admin
from .models import *

admin.site.register(chat)
admin.site.register(chatGroup)
admin.site.register(GroupMessage)
admin.site.register(GroupMember)
admin.site.register(profile)