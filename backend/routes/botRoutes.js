// backend/routes/botRoutes.js
const express = require('express');
const botController = require('../controllers/botController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/start', authMiddleware.protect, (req, res, next) => {
    console.log('POST /api/bot/start hit'); // Log to confirm the route is hit
    next();
}, botController.startConversation);

router.post('/respond', authMiddleware.protect, botController.handleResponse);

module.exports = router;
