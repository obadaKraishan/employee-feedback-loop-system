const express = require('express');
const { submitFeedback, getFeedback, getMyFeedbacks } = require('../controllers/feedbackController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, submitFeedback);
router.get('/', protect, getFeedback);
router.get('/mine', protect, getMyFeedbacks); // Route for fetching logged-in user's feedbacks

module.exports = router;
