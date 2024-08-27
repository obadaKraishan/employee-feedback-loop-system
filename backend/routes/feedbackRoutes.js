// routes/feedbackRoutes.js

const express = require('express');
const {
  submitFeedback,
  getFeedback,
  getMyFeedbacks,
  updateFeedbackStatus,
  addComment,
  getFeedbackById,
} = require('../controllers/feedbackController');
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

// @desc    Get feedback by ID
// @route   GET /api/feedback/:feedbackId
// @access  Private (All Employees)
router.get('/:feedbackId', protect, getFeedbackById); // New route for feedback details

// @desc    Update feedback status
// @route   PUT /api/feedback/:feedbackId/status
// @access  Private (All Employees for their own feedback; Managers and CEO for any feedback)
router.put('/:feedbackId/status', protect, updateFeedbackStatus);

// @desc    Add comment to feedback
// @route   POST /api/feedback/:feedbackId/comment
// @access  Private (All Employees)
router.post('/:feedbackId/comment', protect, addComment);

module.exports = router;
