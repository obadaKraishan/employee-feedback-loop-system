const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
  recipient: {
    type: String, // Can be 'Manager', 'Employee', 'CEO'
    required: true,
  },
  type: {
    type: String, // 'New Comment', 'Status Update', etc.
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  relatedFeedback: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feedback',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
