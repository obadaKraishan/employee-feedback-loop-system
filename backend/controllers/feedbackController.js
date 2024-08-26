const Feedback = require('../models/Feedback');
const { analyzeSentiment } = require('../services/sentimentAnalysisService');

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Private
// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Private
const submitFeedback = async (req, res) => {
  const { message, department, isAnonymous } = req.body;
  const employeeId = req.employee._id; // Assuming you attach employee info to req.employee in the middleware

  try {
    const sentiment = analyzeSentiment(message);

    const feedback = await Feedback.create({
      employeeId: isAnonymous ? 'Anonymous' : employeeId,
      message,
      department,
      sentiment,
      isAnonymous,
      date: new Date(),
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ message: 'Failed to submit feedback', error: error.message });
  }
};

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Private (Role-based access control applied)
const getFeedback = async (req, res) => {
  try {
    let feedback;

    if (req.user.role === 'CEO') {
      // CEO can see all feedbacks
      feedback = await Feedback.find({});
    } else if (req.user.role === 'Manager') {
      // Managers can see feedbacks from their department only
      feedback = await Feedback.find({ department: req.user.department });
    } else {
      // Regular employees should not have access to this route; alternatively, you can implement logic to restrict or customize the feedback they see.
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
    const feedbacks = await Feedback.find({ employeeId: req.user._id });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch feedbacks' });
  }
};

module.exports = {
  submitFeedback,
  getFeedback,
  getMyFeedbacks,
};
