// controllers/fileController.js
const File = require('../models/fileModel');

const uploadFile = async (req, res) => {
   
  const userId = req.user.id; // Get user ID from authenticated request
  const { name, type, content } = req.body; // Example data from request body
  console.log(name,type,content);
  console.log('aan',userId);

  try {
    const fileData = await File.saveFileMetadata(name, type, content, userId);
    console.log("user id is "+fileData);

    // Assuming `excelData` is the parsed data from the uploaded Excel file
    const excelData = []; // Replace with actual data parsing logic

    await File.insertExcelData(excelData, userId);
    res.status(200).json({ message: 'File uploaded and data inserted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing the file.' });
  }
};

module.exports = { uploadFile };
