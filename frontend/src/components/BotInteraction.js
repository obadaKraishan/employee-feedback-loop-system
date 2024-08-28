import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/BotInteraction.css'; // Add custom styles

const BotInteraction = () => {
  const [conversationId, setConversationId] = useState(null);
  const [question, setQuestion] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatActive, setIsChatActive] = useState(false);

  useEffect(() => {
    if (isChatActive) {
      startConversation();
    }
  }, [isChatActive]);

  const startConversation = async () => {
    try {
      const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/bot/start`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setConversationId(response.data.conversationId);
      animateText(response.data.question.questionText);
      setQuestion(response.data.question);
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  };

  const handleResponse = async (responseId, responseText) => {
    try {
      const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;

      // Update chat history with user response
      const updatedChatHistory = [...chatHistory, { text: responseText, sender: 'user' }];
      setChatHistory(updatedChatHistory);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/bot/respond`,
        {
          conversationId,
          questionId: question._id,
          responseId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Animate bot's follow-up question
      animateText(response.data.question.questionText);
      setQuestion(response.data.question);
      setChatHistory([...updatedChatHistory, { text: response.data.question.questionText, sender: 'bot' }]);
    } catch (error) {
      console.error('Error handling response:', error);
    }
  };

  const animateText = (text) => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < text.length) {
        setChatHistory((prev) => [...prev, { text: text.slice(0, index + 1), sender: 'bot' }]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 50);
  };

  const startChat = () => {
    setIsChatActive(true);
    setChatHistory([]);
  };

  const endChat = () => {
    setIsChatActive(false);
    setChatHistory([]);
  };

  return (
    <div className="bot-interaction-container">
      {!isChatActive && (
        <button onClick={startChat} className="start-chat-btn">
          Start Chat
        </button>
      )}
      {isChatActive && (
        <>
          <div className="chat-box overflow-y-auto h-64 p-4 border rounded mb-4">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded ${
                  msg.sender === 'bot' ? 'bg-gray-200 text-left' : 'bg-blue-500 text-white text-right'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          {question && (
            <div className="flex flex-col items-start">
              {question.possibleResponses.map((response) => (
                <button
                  key={response._id}
                  className="px-4 py-2 mb-2 bg-blue-500 text-white rounded"
                  onClick={() => handleResponse(response._id, response.responseText)}
                >
                  {response.responseText}
                </button>
              ))}
              <button onClick={endChat} className="end-chat-btn">
                End Chat
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BotInteraction;
