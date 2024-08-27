// backend/models/BotResponse.js
const mongoose = require('mongoose');

const botResponseSchema = new mongoose.Schema({
  responseText: { type: String, required: true },
  followUpQuestion: { type: mongoose.Schema.Types.ObjectId, ref: 'BotQuestion' },
  action: { type: String }, // Optional: 'end_conversation', 'suggest_feedback', etc.
  intent: { type: mongoose.Schema.Types.ObjectId, ref: 'BotIntent' }, // Link to the intent
  createdAt: { type: Date, default: Date.now },
});

const BotResponse = mongoose.model('BotResponse', botResponseSchema);

module.exports = BotResponse;
