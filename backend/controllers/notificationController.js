const Notification = require('../models/Notification');

// @desc    Get all notifications for the logged-in employee
// @route   GET /api/notifications
// @access  Private
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.employee.role })
            .populate('relatedFeedback', 'message status') // Populate related feedback details
            .sort({ timestamp: -1 });

        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Failed to fetch notifications', error: error.message });
    }
};

// @desc    Mark a specific notification as read
// @route   PUT /api/notifications/:notificationId/read
// @access  Private
const markNotificationAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.notificationId);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        notification.isRead = true;
        await notification.save();

        res.status(200).json(notification);
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ message: 'Failed to update notification', error: error.message });
    }
};

// @desc    Get details of a specific notification
// @route   GET /api/notifications/:notificationId
// @access  Private
const getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.notificationId)
            .populate('relatedFeedback', 'message status') // Populate related feedback details

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.status(200).json(notification);
    } catch (error) {
        console.error('Error fetching notification details:', error);
        res.status(500).json({ message: 'Failed to fetch notification details', error: error.message });
    }
};

module.exports = {
    getNotifications,
    markNotificationAsRead,
    getNotificationById,
};
