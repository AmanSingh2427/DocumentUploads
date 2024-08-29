import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthForm = ({ type }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    gender: 'male',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, username, password } = formData;

    if (type === 'signup' && !name) {
      toast.error('Name is required');
      return false;
    }

    if (type === 'signup' && !username) {
      toast.error('Username is required');
      return false;
    }

    if (!email) {
      toast.error('Email is required');
      return false;
    }

    if (!password) {
      toast.error('Password is required');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/auth/${type}`, formData);
      toast.success(`${type === 'signup' ? 'Sign Up' : 'Login'} successful!`);

      // Save token and user ID to localStorage
      const { token, user } = response.data; // `user` instead of `userId` here
      if (token && user && user.id) { // Checking if user and user.id exist
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user.id); // Save user ID
        console.log('Token:', token);
        console.log('User ID:', user.id);
      }

      // Redirect based on the type of form after a short delay
      setTimeout(() => {
        if (type === 'signup') {
          navigate('/login'); // Redirect to login page after signup
        } else {
          navigate('/home'); // Redirect to home page after login
        }
      }, 1000); // Delay of 1.5 seconds
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleSwitchAuthMode = () => {
    navigate(type === 'signup' ? '/login' : '/');
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 border border-gray-300 shadow-lg rounded-lg">
        {type === 'signup' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {type === 'signup' && (
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          {type === 'signup' ? 'Sign Up' : 'Login'}
        </button>
        <button
          type="button"
          onClick={handleSwitchAuthMode}
          className="w-full bg-gray-500 text-white py-2 px-4 rounded mt-4 hover:bg-gray-600 transition duration-200"
        >
          {type === 'signup' ? 'Switch to Login' : 'Switch to Sign Up'}
        </button>
      </form>
    </>
  );
};

export default AuthForm;
