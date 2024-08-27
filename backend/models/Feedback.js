// models/Feedback.js

const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Reference the Employee model
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
  status: {  
    type: String,
    enum: ['Open', 'Under Process', 'Closed'],
    default: 'Open',
  },
  comments: [
    {
      commenter: {
        type: mongoose.Schema.Types.ObjectId, // Reference the Employee model for commenter
        ref: 'Employee',
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
