import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css'; // Importing CSS for this page
const AuthPage = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();
  
  // Ensure the baseURL is correct
  const baseURL = process.env.REACT_APP_BASE_URL;
  console.log('Base URL:', baseURL); // Debugging line

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }

      // Handle signup process
      // You can still use axios for signup if needed
      try {
        const response = await axios.post(`${baseURL}/users/signup/`, {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        if (response.data.status === 'success') {
          // Redirect to login page or home page
          console.log('Signup successful, redirecting...');
          navigate('/login');
        } else {
          setErrorMessage(response.data.message || 'An error occurred.');
        }
      } catch (error) {
        console.error('Error:', error.response || error.message);
        setErrorMessage('An error occurred. Please try again.');
      }
    } else {
      // Use the onLogin function for login
      const credentials = {
        username: formData.username,
        password: formData.password,
      };
      onLogin(credentials);
    }
  };

  return (
    <div className="auth-page">
      <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        {isSignup && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {isSignup && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        )}
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <p onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Already have an account? Login' : 'Need an account? Sign Up'}
      </p>
    </div>
  );
};

export default AuthPage;
