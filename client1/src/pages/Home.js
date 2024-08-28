import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
  
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      toast.success('File uploaded and data saved successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error uploading file');
    }
  };
  

  return (
    <>
      <ToastContainer />
      <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 shadow-lg rounded-lg">
        <form encType="multipart/form-data" onSubmit={handleUpload} >
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Upload File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Upload
          </button>
        </form>
      </div>
    </>
  );
};

export default Home;
