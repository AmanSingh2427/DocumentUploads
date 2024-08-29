import React from 'react';
import AuthForm from '../components/AuthForm';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const handleLogin = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      console.log(response.data);
      // Use setTimeout to delay the notification
      setTimeout(() => {
        toast.success('Login successful!');
      }, 1000); // Delay of 1 second
    } catch (error) {
      console.error(error);
      // Use setTimeout to delay the notification
      setTimeout(() => {
        toast.error('Failed to log in');
      }, 1000); // Delay of 1 second
    }
  };

  return (
    <>
      <ToastContainer />
      <AuthForm type="login" onSubmit={handleLogin} />
    </>
  );
};

export default LoginPage;
