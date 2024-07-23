import React, { useState } from 'react';
import axios from 'axios';
import './AuthPage.css'; // Importing CSS for this page

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  
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

      try {
        const response = await axios.post(`${baseURL}/users/signup/`, {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        // Handle successful signup
        console.log('Signup response:', response.data);
      } catch (error) {
        console.error('Signup Error:', error.response || error.message);
        setErrorMessage('An error occurred during signup.');
      }
    } else {
      try {
        const response = await axios.post(`${baseURL}/users/login/`, {
          username: formData.username,
          password: formData.password,
        });
        // Handle successful login
        console.log('Login response:', response.data);
      } catch (error) {
        console.error('Login Error:', error.response || error.message);
        setErrorMessage('An error occurred during login.');
      }
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
