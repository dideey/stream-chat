from django import forms
from django.contrib.auth.models import User
from .models import profile

class UpdateUserForm(forms.ModelForm):

    username = forms.CharField(max_length=100, required=True, widget=forms.TextInput(attrs={'class': 'form-control'}))
    email = forms.EmailField(max_length=100, required=True, widget=forms.EmailInput(attrs={'class': 'form-control'}))

    class Meta:
        model = User
        fields = ['username', 'email']

class UpdateProfileForm(forms.ModelForm):
    
    bio = forms.CharField(max_length=1000, required=False, widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 5}))
    profile_pic = forms.ImageField(required=False, widget=forms.FileInput(attrs={'class': 'form-control-file'}))

    class Meta:
        model = profile
        fields = ['bio', 'profile_pic']