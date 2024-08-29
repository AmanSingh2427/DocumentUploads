import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [userName, setUserName] = useState(''); // State to hold the user's name
  const navigate = useNavigate(); // Create an instance of the navigate function

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/current-user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Include JWT token for authentication
          }
        });
        console.log(response);
        
        // Set the user's name from the response
        setUserName(response.data.name);

        // Store the user ID in localStorage
        if (response.data.userId) {
          localStorage.setItem('userId', response.data.userId);
          console.log('User ID:', response.data.userId);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Perform logout logic here, e.g., clearing tokens or user data from local storage
    localStorage.removeItem('token'); // Remove JWT token from local storage
    localStorage.removeItem('userId'); // Remove user ID from local storage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-2 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">My App</h1>
        <ul className="flex space-x-4">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <div className="flex items-center space-x-4">
          <span className="text-lg">{userName}</span> {/* Display user's name */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
