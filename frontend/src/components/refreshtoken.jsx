import axios from 'axios';

const refreshAccessToken = async () => {
  try {
    const response = await axios.post('http://195.35.37.100:8000/api/token/refresh/', {
      refresh: localStorage.getItem('refreshToken'),
    }, {
      headers: {
        'Content-Type': 'application/json', // Example header
        // Add any other required headers here
      }
    });
    localStorage.setItem('accessToken', response.data.access);
    return response.data.access;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

export default refreshAccessToken;