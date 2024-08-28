const File = require('../models/fileModel');
const xlsx = require('xlsx');
const { Readable } = require('stream');
const readline = require('readline');
const csv = require('csv-parser');

const processFileData = (file, fileType) => {
  return new Promise((resolve, reject) => {
    let data = [];
    
    if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      try {
        // Read the Excel file from the buffer
        const workbook = xlsx.read(file.buffer, { type: 'buffer' });
        const sheets = workbook.SheetNames;

        // Process each sheet
        for (let i = 0; i < sheets.length; i++) {
          const sheet = workbook.Sheets[sheets[i]];
          const temp = xlsx.utils.sheet_to_json(sheet);
          temp.forEach((row) => {
            data.push(row);
          });
        }

        resolve(data);
      } catch (error) {
        reject(error);
      }
    } else if (fileType === 'text/plain') {
      try {
        // Process text file
        const readable = Readable.from(file.buffer);
        const rl = readline.createInterface({ input: readable });

        let headers = [];
        
        rl.on('line', (line) => {
          const values = line.split(/\s+|\t+/); // Split by whitespace or tabs
          if (headers.length === 0) {
            headers = values; // First line is the header
          } else {
            let row = {};
            headers.forEach((header, index) => {
              row[header] = values[index];
            });
            data.push(row);
          }
        });

        rl.on('close', () => {
          resolve(data);
        });

        rl.on('error', (error) => {
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    } else if (fileType === 'text/csv' || fileType === 'application/csv') {
      try {
        // Process CSV file
        const readable = Readable.from(file.buffer);

        readable
          .pipe(csv())
          .on('data', (row) => data.push(row))
          .on('end', () => resolve(data))
          .on('error', (error) => reject(error));
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

    // Insert Excel, text, or CSV file data into the database
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
