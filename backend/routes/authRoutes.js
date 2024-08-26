const express = require('express');
const router = express.Router();
const { loginEmployee } = require('../controllers/authController');

// Define the login route
router.post('/login', loginEmployee);

module.exports = router;
