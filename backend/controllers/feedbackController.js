// controllers/feedbackController.js

const Notification = require('../models/Notification');
const Feedback = require('../models/Feedback');
const { analyzeSentiment } = require('../services/sentimentAnalysisService');
const mongoose = require('mongoose');

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Private
const submitFeedback = async (req, res) => {
  const { message, department, isAnonymous } = req.body;
  const employeeId = req.employee._id;

  try {
    const sentiment = analyzeSentiment(message);

    const feedback = await Feedback.create({
      employeeId: isAnonymous ? 'Anonymous' : employeeId,
      message,
      department,
      sentiment,
      isAnonymous,
      status: 'Open', // Default status when feedback is created
      date: new Date(),
    });

    // Notify the relevant manager and CEO
    await Notification.create({
      recipient: 'Manager', // Adjust based on the department
      type: 'New Feedback',
      message: `New feedback submitted in ${department}`,
      relatedFeedback: feedback._id,
    });

    await Notification.create({
      recipient: 'CEO',
      type: 'New Feedback',
      message: `New feedback submitted by an employee in ${department}`,
      relatedFeedback: feedback._id,
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ message: 'Failed to submit feedback', error: error.message });
  }
};

// @desc    Update feedback status
// @route   PUT /api/feedback/:feedbackId/status
// @access  Private
const updateFeedbackStatus = async (req, res) => {
  const { feedbackId } = req.params;
  const { status } = req.body;
  const userInfo = req.employee;

  try {
    const feedback = await Feedback.findById(feedbackId);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Attach the feedback to req object for further checks
    req.feedback = feedback;

    // Restrict employees to only change the status of their own feedback from "Open" to "Closed"
    if (userInfo.role === 'Employee') {
      if (feedback.employeeId.toString() !== userInfo._id.toString()) {
        return res.status(403).json({ message: 'You can only update your own feedback' });
      }

      if (feedback.status === 'Closed') {
        return res.status(403).json({ message: 'Feedback is already closed and cannot be reopened or changed' });
      }

      if (status !== 'Closed') {
        return res.status(403).json({ message: 'You can only close your feedback' });
      }
    }

    // Managers and CEOs can change the status to any value
    feedback.status = status;
    await feedback.save();

    // Notify the employee and CEO
    await Notification.create({
      recipient: feedback.employeeId, // Notify the feedback submitter
      type: 'Status Update',
      message: `Your feedback's status has been updated to ${status}`,
      relatedFeedback: feedback._id,
    });

    await Notification.create({
      recipient: 'CEO',
      type: 'Status Update',
      message: `Feedback in ${feedback.department} status updated to ${status}`,
      relatedFeedback: feedback._id,
    });

    res.status(200).json({ status: feedback.status });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status', error: error.message });
  }
};

// @desc    Add comment to feedback
// @route   POST /api/feedback/:feedbackId/comment
// @access  Private
const addComment = async (req, res) => {
  const { feedbackId } = req.params;
  const { commentText, isAnonymous } = req.body;
  const userInfo = req.employee;

  try {
    const feedback = await Feedback.findById(feedbackId);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // If feedback is closed, deny adding comments
    if (feedback.status === 'Closed' && userInfo.role === 'Employee') {
      return res.status(403).json({ message: 'Cannot add comments to closed feedback' });
    }

    const newComment = {
      commenter: userInfo._id, // Use user ID to reference the commenter
      commentText,
      isAnonymous,
      timestamp: new Date(),
    };

    feedback.comments.push(newComment);
    await feedback.save();

    // Notify the employee and CEO about the new comment
    await Notification.create({
      recipient: feedback.employeeId, // Notify the feedback submitter
      type: 'New Comment',
      message: `A new comment was added to your feedback`,
      relatedFeedback: feedback._id,
    });

    await Notification.create({
      recipient: 'CEO',
      type: 'New Comment',
      message: `A new comment was added to feedback in ${feedback.department}`,
      relatedFeedback: feedback._id,
    });

    // Optionally, notify the Manager
    await Notification.create({
      recipient: 'Manager', // Adjust based on the department
      type: 'New Comment',
      message: `A new comment was added to feedback in ${feedback.department}`,
      relatedFeedback: feedback._id,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Failed to add comment', error: error.message });
  }
};

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Private (Role-based access control applied)
const getFeedback = async (req, res) => {
  try {
    let feedback;

    if (req.employee.role === 'CEO') {
      feedback = await Feedback.find({});
    } else if (req.employee.role === 'Manager') {
      feedback = await Feedback.find({ department: req.employee.department });
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch feedback', error: error.message });
  }
};

// @desc    Get logged-in user's feedbacks
// @route   GET /api/feedback/mine
// @access  Private
const getMyFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ employeeId: req.employee._id });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch feedbacks' });
  }
};

// @desc    Get feedback by ID
// @route   GET /api/feedback/:feedbackId
// @access  Private
const getFeedbackById = async (req, res) => {
  try {
    const { feedbackId } = req.params;

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(feedbackId)) {
      return res.status(400).json({ message: 'Invalid feedback ID' });
    }

    const feedback = await Feedback.findById(feedbackId)
      .populate('employeeId', 'name email') // Populate employee details if needed
      .populate('comments.commenter', 'name'); // Populate commenter details if needed

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Failed to fetch feedback', error: error.message });
  }
};

module.exports = {
  submitFeedback,
  updateFeedbackStatus,
  addComment,
  getFeedback,
  getMyFeedbacks,
  getFeedbackById,  // New export for getting feedback details by ID
};
