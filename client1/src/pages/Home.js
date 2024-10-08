import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { FaTimes } from 'react-icons/fa';
import DownloadButton from './DownloadButton'; // Import the DownloadButton component

const Home = () => {
  const [file, setFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isUploadFormVisible, setUploadFormVisible] = useState(false);

  // Retrieve the user ID from local storage
  const userId = localStorage.getItem('userId');

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
    formData.append('userId', userId); // Include userId in the form data

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('File uploaded and data saved successfully');
      setUploadFormVisible(false);
      fetchData(); // Refresh the data after successful upload
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error uploading file');
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/excel-data?userId=${userId}`);
      setExcelData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      toast.error('Error fetching data');
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  useEffect(() => {
    const filtered = excelData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [searchTerm, excelData]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const toggleUploadForm = () => {
    setUploadFormVisible(!isUploadFormVisible);
  };

  // UseEffect to trigger toast notifications when user logs in or signs up successfully
  useEffect(() => {
    const userAction = localStorage.getItem('userAction');
    if (userAction) {
      setTimeout(() => {
        if (userAction === 'login') {
          toast.success('Logged in successfully!');
        } else if (userAction === 'signup') {
          toast.success('Signed up successfully!');
        }
        localStorage.removeItem('userAction'); // Clear the action after showing the toast
      }, 3000); // Delay of 1 second before showing the toast
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex p-4">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/3 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
            />
            <button
              onClick={toggleUploadForm}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Upload Document
            </button>
            <DownloadButton data={filteredData} /> {/* Add the DownloadButton here */}
          </div>
          <div className="flex-1 p-8 bg-gray-100">
            <div className="bg-white p-8 border border-gray-300 shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Excel Data</h2>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Role</th>
                    <th className="py-2 px-4 border-b">Phone</th>
                    <th className="py-2 px-4 border-b">Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2 px-4 border-b">{item.id}</td>
                      <td className="py-2 px-4 border-b">{item.name}</td>
                      <td className="py-2 px-4 border-b">{item.email}</td>
                      <td className="py-2 px-4 border-b">{item.role}</td>
                      <td className="py-2 px-4 border-b">{item.phone}</td>
                      <td className="py-2 px-4 border-b">{item.gender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50"
                >
                  Previous
                </button>
                <div>
                  <span className="mx-2">
                    {currentPage} / {totalPages}
                  </span>
                </div>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isUploadFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 border border-gray-300 shadow-lg rounded-lg relative w-96">
            <button
              onClick={toggleUploadForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Upload File</h2>
            <form encType="multipart/form-data" onSubmit={handleUpload}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Select File</label>
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
        </div>
      )}
    </>
  );
};

export default Home;
