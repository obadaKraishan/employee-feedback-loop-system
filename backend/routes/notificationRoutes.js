const express = require('express');
const { getNotifications, markNotificationAsRead } = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @desc    Get all notifications
// @route   GET /api/notifications
// @access  Private (All Employees)
router.get('/', protect, getNotifications);

// @desc    Mark notification as read
// @route   PUT /api/notifications/:notificationId/read
// @access  Private (All Employees)
router.put('/:notificationId/read', protect, markNotificationAsRead);

module.exports = router;
