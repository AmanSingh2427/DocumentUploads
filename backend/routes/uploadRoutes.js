const express = require('express');
const uploadController = require('../controllers/uploadController');
const fileUpload = require('../middlewares/fileUpload');


const router = express.Router();

// Define the route for file upload
router.post('/upload', fileUpload.single('file'), uploadController.uploadFile);

module.exports = router;
