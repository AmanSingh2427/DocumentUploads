import React from 'react';
import AuthForm from '../components/AuthForm';
import axios from 'axios';

const LoginPage = () => {
  const handleLogin = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      console.log(response.data);
      alert('Login successful!');
    } catch (error) {
      console.error(error);
      alert('Invalid credentials');
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
};

export default LoginPage;
