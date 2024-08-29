import React from 'react';
import AuthForm from '../components/AuthForm';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
  const handleSignup = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      console.log(response.data);
      // Use setTimeout to delay the notification
      setTimeout(() => {
        toast.success('User registered successfully!');
      }, 1000); // Delay of 1 second
    } catch (error) {
      console.error(error);
      // Use setTimeout to delay the notification
      setTimeout(() => {
        toast.error('Failed to register user');
      }, 1000); // Delay of 1 second
    }
  };

  return (
    <>
      <ToastContainer />
      <AuthForm type="signup" onSubmit={handleSignup} />
    </>
  );
};

export default SignupPage;
