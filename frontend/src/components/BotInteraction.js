import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BotInteraction = () => {
  const [conversationId, setConversationId] = useState(null);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startConversation = async () => {
      const response = await axios.post('/api/bot/start');
      setConversationId(response.data.conversationId);
      setQuestion(response.data.question);
      setLoading(false);
    };
    startConversation();
  }, []);

  const handleResponse = async (responseId) => {
    const response = await axios.post('/api/bot/respond', {
      conversationId,
      questionId: question._id,
      responseId,
    });
    setQuestion(response.data.question);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3>{question.questionText}</h3>
      <div>
        {question.possibleResponses.map((response) => (
          <button key={response._id} onClick={() => handleResponse(response._id)}>
            {response.responseText}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BotInteraction;
