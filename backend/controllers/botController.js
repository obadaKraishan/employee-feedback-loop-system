const botService = require('../services/botService');

const startConversation = async (req, res) => {
  try {
    const { employeeId } = req.user; // Assuming employeeId is retrieved from the authenticated user
    const { conversation, firstQuestion } = await botService.startConversation(employeeId);
    res.json({ conversationId: conversation._id, question: firstQuestion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleResponse = async (req, res) => {
  try {
    const { conversationId, questionId, responseId } = req.body;
    const followUpQuestion = await botService.handleResponse(conversationId, questionId, responseId);
    res.json({ question: followUpQuestion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  startConversation,
  handleResponse,
};
