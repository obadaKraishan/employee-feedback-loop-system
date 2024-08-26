// routes/feedbackRoutes.js
const express = require('express');
const { submitFeedback, getFeedback, getMyFeedbacks } = require('../controllers/feedbackController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, submitFeedback);
router.get('/', protect, getFeedback);
router.get('/mine', protect, getMyFeedbacks);

module.exports = router; // Ensure this is exporting the router, not an object
