const express = require('express');
const { submitFeedback, getFeedback, getMyFeedbacks } = require('../controllers/feedbackController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Private (All Employees)
router.post('/', protect, submitFeedback);

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Private (CEO and Manager)
router.get('/', protect, authorize('CEO', 'Manager'), getFeedback);

// @desc    Get logged-in user's feedbacks
// @route   GET /api/feedback/mine
// @access  Private (All Employees)
router.get('/mine', protect, getMyFeedbacks);

module.exports = router;
