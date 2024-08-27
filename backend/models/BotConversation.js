const mongoose = require('mongoose');

const botConversationSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  conversationHistory: [{
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'BotQuestion' },
    response: { type: mongoose.Schema.Types.ObjectId, ref: 'BotResponse' },
    timestamp: { type: Date, default: Date.now },
  }],
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date },
});

const BotConversation = mongoose.model('BotConversation', botConversationSchema);

module.exports = BotConversation;
