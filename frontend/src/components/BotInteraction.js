import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BotInteraction = () => {
  const [conversationId, setConversationId] = useState(null);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startConversation = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;

        // Make the POST request to start the conversation
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/bot/start`, // Use the environment variable for the base URL
          {}, // Empty body
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          }
        );

        // Set the conversation ID and first question
        setConversationId(response.data.conversationId);
        setQuestion(response.data.question);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    startConversation();
  }, []);

  const handleResponse = async (responseId) => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;

      // Make the POST request to send the response
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/bot/respond`,
        {
          conversationId,
          questionId: question._id,
          responseId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      // Set the next question
      setQuestion(response.data.question);
    } catch (error) {
      console.error(error);
    }
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
