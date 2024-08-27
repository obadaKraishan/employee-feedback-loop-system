// routes/notificationRoutes.js

const express = require('express');
const { getNotifications, markNotificationAsRead, getNotificationById } = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @desc    Get all notifications
// @route   GET /api/notifications
// @access  Private (All Employees)
router.get('/', protect, getNotifications);

// @desc    Get single notification
// @route   GET /api/notifications/:notificationId
// @access  Private (All Employees)
router.get('/:notificationId', protect, getNotificationById); // New route for single notification

// @desc    Mark notification as read
// @route   PUT /api/notifications/:notificationId/read
// @access  Private (All Employees)
router.put('/:notificationId/read', protect, markNotificationAsRead);

module.exports = router;
