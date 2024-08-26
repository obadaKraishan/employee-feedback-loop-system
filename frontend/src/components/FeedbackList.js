import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FeedbackList() {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/feedback`);
        setFeedbackList(data);
      } catch (error) {
        console.error('Failed to fetch feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Feedback List</h2>
      {feedbackList.length > 0 ? (
        <ul className="space-y-2">
          {feedbackList.map((feedback) => (
            <li key={feedback._id} className="p-4 bg-gray-100 rounded shadow">
              <strong>{feedback.isAnonymous ? 'Anonymous' : feedback.employeeId}</strong>: {feedback.message}
              <div className="text-sm text-gray-600">Sentiment Score: {feedback.sentimentScore}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedback available</p>
      )}
    </div>
  );
}

export default FeedbackList;
