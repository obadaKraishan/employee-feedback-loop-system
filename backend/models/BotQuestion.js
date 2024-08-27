// backend/models/BotQuestion.js
const mongoose = require('mongoose');

const botQuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  possibleResponses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BotResponse' }],
  createdAt: { type: Date, default: Date.now },
});

const BotQuestion = mongoose.model('BotQuestion', botQuestionSchema);

module.exports = BotQuestion;
