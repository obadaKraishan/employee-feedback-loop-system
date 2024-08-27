const BotQuestion = require('../models/BotQuestion');
const BotResponse = require('../models/BotResponse');
const BotConversation = require('../models/BotConversation');

const startConversation = async (employeeId) => {
  const firstQuestion = await BotQuestion.findOne({}).populate('possibleResponses');
  const conversation = await BotConversation.create({
    employeeId,
    conversationHistory: [],
  });
  return { conversation, firstQuestion };
};

const handleResponse = async (conversationId, questionId, responseId) => {
  const conversation = await BotConversation.findById(conversationId);
  const question = await BotQuestion.findById(questionId);
  const response = await BotResponse.findById(responseId);

  conversation.conversationHistory.push({ question: questionId, response: responseId });
  await conversation.save();

  let followUpQuestion = response.followUpQuestion;
  if (!followUpQuestion) {
    followUpQuestion = await BotQuestion.findOne({}).populate('possibleResponses');
  } else {
    followUpQuestion = await BotQuestion.findById(followUpQuestion).populate('possibleResponses');
  }

  return followUpQuestion;
};

module.exports = {
  startConversation,
  handleResponse,
};
