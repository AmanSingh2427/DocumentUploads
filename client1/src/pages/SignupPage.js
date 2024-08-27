import React from 'react';
import AuthForm from '../components/AuthForm';
import axios from 'axios';

const SignupPage = () => {
  const handleSignup = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      console.log(response.data);
      alert('User registered successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to register user');
    }
  };

  return <AuthForm type="signup" onSubmit={handleSignup} />;
};

export default SignupPage;
