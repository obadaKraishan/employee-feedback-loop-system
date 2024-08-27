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
  sentiment: {
    type: String,
    enum: ['positive', 'negative', 'neutral'],
    default: 'neutral',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  status: {  // Add the status field here
    type: String,
    enum: ['Open', 'Under Process', 'Closed'],
    default: 'Open',
  },
  comments: [
    {
      commenter: {
        type: String, // Can be 'Manager', 'Employee', or 'CEO'
        required: true,
      },
      commentText: {
        type: String,
        required: true,
      },
      isAnonymous: {
        type: Boolean,
        default: false,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, {
  timestamps: true,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
