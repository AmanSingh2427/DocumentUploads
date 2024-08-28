import React from 'react';
import { FaHome, FaUser, FaCog, FaUpload } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4">
      <ul className="space-y-6">
        <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaHome />
          <Link to="">Dashboard</Link>
        </li>
        <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaUpload />
          <Link to="">Upload Document</Link>
        </li>
        <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaUser />
          <span>Profile</span>
        </li>
        <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaCog />
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
