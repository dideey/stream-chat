import axios from 'axios';
import { useAuth } from './AuthContext';

const useAxios = () => {
  const { accessToken, refreshToken, login, logout } = useAuth();

  const instance = axios.create({
    baseURL: 'http://195.35.37.100:8000',
  });

  instance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await axios.post('http://195.35.37.100:8000/api/token/refresh/', {
            refresh: refreshToken,
          });

          if (response.data.access) {
            const newAccessToken = response.data.access;
            localStorage.setItem('accessToken', newAccessToken);
            login({ ...user, accessToken: newAccessToken });
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          }
        } catch (refreshError) {
          logout();
          console.error('Refresh token expired or invalid. Logging out.', refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxios;
