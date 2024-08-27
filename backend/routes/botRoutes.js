const express = require('express');
const botController = require('../controllers/botController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/start', authMiddleware.protect, botController.startConversation);
router.post('/respond', authMiddleware.protect, botController.handleResponse);

module.exports = router;
