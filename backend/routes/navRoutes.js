const express = require('express');
const router = express.Router();
const userController = require('../controllers/navController');

router.get('/current-user', userController.authenticateToken, userController.getCurrentUser);

module.exports = router;
