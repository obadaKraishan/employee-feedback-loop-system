import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/BotInteraction.css';

const BotInteraction = () => {
    const [conversationId, setConversationId] = useState(null);
    const [question, setQuestion] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [isChatActive, setIsChatActive] = useState(false);

    const startConversation = useCallback(async () => {
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

            console.log('Received question:', response.data.question);
            setConversationId(response.data.conversationId);
            animateText(response.data.question.questionText);
            setQuestion(response.data.question);
        } catch (error) {
            console.error('Error starting conversation:', error);
        }
    }, []);

    useEffect(() => {
        if (isChatActive) {
            startConversation();
        }
    }, [isChatActive, startConversation]);

    const handleResponse = async (responseId, responseText) => {
        try {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;

            setChatHistory((prev) => [...prev, { text: responseText, sender: 'user' }]);

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

            console.log('Received follow-up question:', response.data.question);
            if (response.data.question) {
                animateText(response.data.question.questionText);
                setQuestion(response.data.question);
            } else {
                setQuestion(null);
                setChatHistory((prev) => [...prev, { text: "Conversation ended.", sender: 'bot' }]);
            }

        } catch (error) {
            console.error('Error handling response:', error);
        }
    };

    const animateText = (text) => {
        let index = 0;
        let newText = '';
        const intervalId = setInterval(() => {
            if (index < text.length) {
                newText += text[index];
                setChatHistory((prev) => {
                    const updatedHistory = prev.slice(0, -1);
                    return [...updatedHistory, { text: newText, sender: 'bot' }];
                });
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
        setQuestion(null);
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
                                    msg.sender === 'bot' ? 'bg-gray-200 text-left letter-by-letter' : 'bg-blue-500 text-white text-right'
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    {question && question.possibleResponses.length > 0 && (
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
