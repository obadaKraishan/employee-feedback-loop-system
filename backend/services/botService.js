const mongoose = require('mongoose');
const BotQuestion = require('../models/BotQuestion');
const BotResponse = require('../models/BotResponse');
const BotConversation = require('../models/BotConversation');

const startConversation = async (employeeId) => {
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
        throw new Error('Invalid employeeId');
    }

    const firstQuestion = await BotQuestion.findOne({}).populate('possibleResponses');
    const conversation = await BotConversation.create({
        employeeId: employeeId,
        conversationHistory: [],
    });

    console.log('Starting conversation:', conversation);
    console.log('First question:', firstQuestion);

    return { conversation, firstQuestion };
};

const handleResponse = async (conversationId, questionId, responseId) => {
  const conversation = await BotConversation.findById(conversationId);
  const response = await BotResponse.findById(responseId).populate('followUpQuestion');

  console.log('Current conversation history:', conversation.conversationHistory);
  console.log('Current question:', questionId);
  console.log('Selected response:', response);
  console.log('Follow-up Question ID:', response.followUpQuestion);

  conversation.conversationHistory.push({ question: questionId, response: responseId });
  await conversation.save();

  let followUpQuestion = response.followUpQuestion;

  if (!followUpQuestion) {
      console.log('No follow-up question linked. Ending conversation.');
      return null; // No follow-up question, end conversation
  } else {
      followUpQuestion = await BotQuestion.findById(followUpQuestion._id).populate('possibleResponses');
      console.log('Next follow-up question:', followUpQuestion);

      if (!followUpQuestion.possibleResponses || followUpQuestion.possibleResponses.length === 0) {
          console.log('Follow-up question has no possible responses. Ending conversation.');
          return null; // No responses for follow-up question, end conversation
      }
  }

  return followUpQuestion;
};


module.exports = {
    startConversation,
    handleResponse,
};
