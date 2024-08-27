// src/components/FeedbackList.js

import React, { useState } from 'react';
import FeedbackDiscussion from './FeedbackDiscussion';

function FeedbackList({ feedbacks }) {
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleCommentAdded = (newComment) => {
    setSelectedFeedback({
      ...selectedFeedback,
      comments: [...selectedFeedback.comments, newComment],
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Feedback List</h2>
      {feedbacks.length > 0 ? (
        <ul className="space-y-2">
          {feedbacks.map((feedback) => (
            <li key={feedback._id} className="p-4 bg-gray-100 rounded shadow">
              <strong>{feedback.isAnonymous ? 'Anonymous' : feedback.employeeId}</strong>: {feedback.message}
              <div className="text-sm text-gray-600">Sentiment: {feedback.sentiment}</div>
              
              <button
                onClick={() => setSelectedFeedback(selectedFeedback === feedback ? null : feedback)}
                className="text-blue-500 hover:underline mt-2"
              >
                {selectedFeedback === feedback ? 'Hide Comments' : 'Show Comments'}
              </button>

              {selectedFeedback === feedback && (
                <FeedbackDiscussion
                  feedbackId={feedback._id}
                  comments={feedback.comments}
                  onNewComment={handleCommentAdded}
                />
              )}
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
