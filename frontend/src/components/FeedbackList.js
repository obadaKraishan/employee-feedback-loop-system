import React, { useState } from 'react';
import FeedbackDiscussion from './FeedbackDiscussion';

function FeedbackList({ feedbacks }) {
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleCommentAdded = (newComment) => {
    console.log('New comment added:', newComment);
    if (selectedFeedback) {
      setSelectedFeedback((prevFeedback) => ({
        ...prevFeedback,
        comments: [...prevFeedback.comments, newComment],
      }));
    }
  };

  const handleStatusChange = (newStatus) => {
    console.log('Status changed to:', newStatus);
    if (selectedFeedback) {
      setSelectedFeedback((prevFeedback) => ({
        ...prevFeedback,
        status: newStatus,
      }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-green-500';
      case 'Under Process':
        return 'bg-yellow-500';
      case 'Closed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Feedback List</h2>
      {feedbacks.length > 0 ? (
        <ul className="space-y-2">
          {feedbacks.map((feedback) => (
            <li key={feedback._id} className="p-4 bg-gray-100 rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <strong>{feedback.isAnonymous ? 'Anonymous' : feedback.employeeId?.name || 'Unknown'}</strong>: {/* Safely access name */}
                  {feedback.message}
                  <div className="text-sm text-gray-600">Sentiment: {feedback.sentiment}</div>
                </div>
                <span
                  className={`text-white text-xs px-2 py-1 rounded ${getStatusColor(feedback.status)}`}
                  title={`Status: ${feedback.status}`}
                >
                  {feedback.status}
                </span>
              </div>
              <button
                onClick={() => {
                  console.log('Selected feedback:', feedback);
                  setSelectedFeedback(selectedFeedback === feedback ? null : feedback);
                }}
                className="text-blue-500 hover:underline mt-2"
              >
                {selectedFeedback === feedback ? 'Hide Comments' : 'Show Comments'}
              </button>

              {selectedFeedback === feedback && (
                <FeedbackDiscussion
                  feedbackId={feedback._id}
                  comments={selectedFeedback.comments}
                  status={selectedFeedback.status}
                  onNewComment={handleCommentAdded}
                  onStatusChange={handleStatusChange}
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
