const File = require('../models/fileModel');
const xlsx = require('xlsx');
const { Readable } = require('stream');

const processFileData = (file, fileType) => {
  return new Promise((resolve, reject) => {
    if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      try {
        // Read the Excel file from the buffer
        const workbook = xlsx.read(file.buffer, { type: 'buffer' });

        let data = [];
        const sheets = workbook.SheetNames;

        // Process each sheet
        for (let i = 0; i < sheets.length; i++) {
          const sheet = workbook.Sheets[sheets[i]];
          const temp = xlsx.utils.sheet_to_json(sheet);
          temp.forEach((row) => {
            data.push(row);
          });
        }

        // Resolve with the collected data
        resolve(data);
      } catch (error) {
        reject(error);
      }
    } else {
      reject(new Error('Unsupported file type'));
    }
  });
};

const uploadFile = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const fileType = file.mimetype;
    const fileData = await processFileData(file, fileType);
    
    // Print the file data to the console
    console.log('File Data:', fileData);

    // Save file metadata and content
    const savedFile = await File.saveFileMetadata(
      file.originalname,
      fileType,
      file.buffer
    );

    // Insert Excel data into the database
    await File.insertExcelData(fileData);

    res.status(200).json({ message: 'File uploaded, data saved, and inserted into database successfully', file: savedFile });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ message: 'Error processing file', error: error.message });
  }
};

module.exports = {
  uploadFile,
};
