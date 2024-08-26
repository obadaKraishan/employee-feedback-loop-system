import React from 'react';

function FeedbackList({ feedbacks }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Feedback List</h2>
      {feedbacks.length > 0 ? (
        <ul className="space-y-2">
          {feedbacks.map((feedback) => (
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
