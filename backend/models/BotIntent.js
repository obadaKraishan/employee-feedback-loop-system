// backend/models/BotIntent.js
const mongoose = require('mongoose');

const botIntentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const BotIntent = mongoose.model('BotIntent', botIntentSchema);

module.exports = BotIntent;
