from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile

class ProfileViewTest(TestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.client.login(username='testuser', password='12345')

        # URL for the profile view
        self.profile_url = reverse('profile')  # Adjust 'profile' to match the actual name used in your urls.py

    def test_profile_update_post(self):
        # Prepare data for the POST request
        user_data = {'first_name': 'Test', 'last_name': 'User'}
        profile_data = {'bio': 'This is a test bio.'}
        # Assuming the profile expects an image upload, adjust as necessary
        image = SimpleUploadedFile(name='test_image.jpg', content=b'', content_type='image/jpeg')
        post_data = {**user_data, **profile_data, 'image': image}  # Adjust 'image' key as necessary

        # Send POST request
        response = self.client.post(self.profile_url, post_data)

        # Check that the response indicates success
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(str(response.content, encoding='utf8'), {'status': 'success'})

        # Optionally, verify that the user and profile were updated correctly
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, 'Test')
        # Add more assertions as necessary for profile fields