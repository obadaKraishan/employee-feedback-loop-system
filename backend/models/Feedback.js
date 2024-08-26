const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sentimentScore: {
    type: Number,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
