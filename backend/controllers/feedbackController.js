const Feedback = require('../models/Feedback');
const { analyzeSentiment } = require('../services/sentimentAnalysisService');

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

  try {
    const feedback = await Feedback.findById(feedbackId);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    feedback.status = status;
    await feedback.save();

    res.status(200).json({ status: feedback.status });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status', error: error.message });
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

module.exports = {
  submitFeedback,
  updateFeedbackStatus,  // Export the new function
  getFeedback,
  getMyFeedbacks,
};
