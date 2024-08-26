import React from 'react';
import FeedbackForm from '../components/FeedbackForm';

function Feedback() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Submit Feedback</h1>
      <FeedbackForm />
    </div>
  );
}

export default Feedback;
