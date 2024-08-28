const botService = require('../services/botService');
const BotQuestion = require('../models/BotQuestion');

describe('Bot Service', () => {
  it('should start a conversation and return the first question', async () => {
    const question = await BotQuestion.findOne({}).populate('possibleResponses');
    const { conversation, firstQuestion } = await botService.startConversation('testEmployeeId');
    
    expect(conversation).toBeDefined();
    expect(firstQuestion).toEqual(question);
  });

  it('should handle a response and return the follow-up question', async () => {
    const question = await BotQuestion.findOne({});
    const response = question.possibleResponses[0];
    
    const followUpQuestion = await botService.handleResponse('testConversationId', question._id, response._id);
    
    expect(followUpQuestion).toBeDefined();
  });
});
