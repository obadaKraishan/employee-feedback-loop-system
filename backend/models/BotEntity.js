// backend/models/BotEntity.js
const mongoose = require('mongoose');

const botEntitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const BotEntity = mongoose.model('BotEntity', botEntitySchema);

module.exports = BotEntity;
