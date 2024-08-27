const express = require('express');
const { submitFeedback, getFeedback, getMyFeedbacks, updateFeedbackStatus } = require('../controllers/feedbackController');
const { protect, authorize } = require('../middleware/authMiddleware');
const Feedback = require('../models/Feedback');  // Import the Feedback model

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

// @desc    Update feedback status
// @route   PUT /api/feedback/:feedbackId/status
// @access  Private (Manager, CEO)
router.put('/:feedbackId/status', protect, authorize('Manager', 'CEO'), updateFeedbackStatus);

// @desc    Add comment to feedback
// @route   POST /api/feedback/:feedbackId/comment
// @access  Private (All Employees)
router.post('/:feedbackId/comment', protect, async (req, res) => {
    try {
        const { feedbackId } = req.params;
        const { commentText, isAnonymous } = req.body;
        const userInfo = req.employee;

        const feedback = await Feedback.findById(feedbackId);

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        const newComment = {
            commenter: userInfo.role,
            commentText,
            isAnonymous,
            timestamp: new Date(),
        };

        feedback.comments.push(newComment);
        await feedback.save();

        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Failed to add comment', error: error.message });
    }
});

module.exports = router;
