import axios from 'axios';
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!refreshToken) {
    console.error('Refresh token not found');
    throw new Error('Refresh token not found');
  }

  try {
    const response = await axios.post('http://195.35.37.100:8000/api/token/refresh/', {
      refresh: refreshToken,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // Update access token
    localStorage.setItem('accessToken', response.data.access);
    return response.data.access;
  } catch (error) {
    // Handle specific error response from server
    if (error.response && error.response.status === 401) {
      console.error('Refresh token is invalid or expired.');
      // Handle invalid refresh token, possibly redirect to login
    } else {
      console.error('Error refreshing access token:', error.response ? error.response.data : error.message);
    }
    throw error;
  }
};

export default refreshAccessToken