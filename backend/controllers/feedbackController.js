const Feedback = require('../models/Feedback');
const { analyzeSentiment } = require('../services/sentimentAnalysisService');

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Public
const submitFeedback = async (req, res) => {
  const { employeeId, message, isAnonymous } = req.body;

  try {
    const sentiment = analyzeSentiment(message);

    const feedback = await Feedback.create({
      employeeId: isAnonymous ? 'Anonymous' : employeeId,
      message,
      sentiment,
      isAnonymous,
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ message: 'Failed to submit feedback', error: error.message });
  }
};

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Public
const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({});
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch feedback', error: error.message });
  }
};

module.exports = {
  submitFeedback,
  getFeedback,
};
