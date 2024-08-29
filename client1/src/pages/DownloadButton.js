// DownloadButton.js
import React from 'react';
import { saveAs } from 'file-saver';
import { utils, writeFile } from 'xlsx';

const DownloadButton = ({ data }) => {
  const handleDownload = () => {
    if (!data.length) {
      alert('No data available to download');
      return;
    }

    // Convert JSON data to worksheet
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');

    // Write Excel file
    writeFile(wb, 'user_data.xlsx');
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
    >
      Download Data
    </button>
  );
};

export default DownloadButton;
