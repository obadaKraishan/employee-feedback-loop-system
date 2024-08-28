// backend/controllers/botController.js
const botService = require('../services/botService');

const startConversation = async (req, res) => {
    try {
        // Ensure req.user (or req.employee) is defined
        console.log('User (Employee):', req.employee); // Log user details to verify

        if (!req.employee) {
            return res.status(401).json({ message: 'User not found' });
        }

        const { employeeId } = req.employee; // Extract employeeId from req.employee
        console.log('Starting conversation for employeeId:', employeeId);

        const { conversation, firstQuestion } = await botService.startConversation(employeeId);

        if (!conversation || !firstQuestion) {
            console.error('Failed to start conversation:', { conversation, firstQuestion });
            return res.status(500).json({ message: 'Failed to start conversation' });
        }

        res.json({ conversationId: conversation._id, question: firstQuestion });
    } catch (error) {
        console.error('Error in startConversation:', error);
        res.status(500).json({ message: error.message });
    }
};

const handleResponse = async (req, res) => {
    try {
        const { conversationId, questionId, responseId } = req.body;
        console.log('Handling response for conversationId:', conversationId);

        const followUpQuestion = await botService.handleResponse(conversationId, questionId, responseId);

        if (!followUpQuestion) {
            console.error('Failed to handle response:', { followUpQuestion });
            return res.status(500).json({ message: 'Failed to handle response' });
        }

        res.json({ question: followUpQuestion });
    } catch (error) {
        console.error('Error in handleResponse:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    startConversation,
    handleResponse,
};
