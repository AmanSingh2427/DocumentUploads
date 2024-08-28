// routes/authRoutes.js
const express = require('express');
const { signup, login } = require('../controllers/userController');
// const { uploadFile, upload } = require('../controllers/uploadController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
// router.post('/upload', upload, uploadFile);

module.exports = router;
