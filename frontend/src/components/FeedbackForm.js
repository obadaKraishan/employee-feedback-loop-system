import React, { useState } from 'react';
import axios from 'axios';

function FeedbackForm() {
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const submitFeedback = async (e) => {
    e.preventDefault();
    try {
      const feedback = {
        employeeId: '12345', // Replace with actual employee ID
        message,
        isAnonymous,
      };
      await axios.post(`${process.env.REACT_APP_API_URL}/api/feedback`, feedback);
      alert('Feedback submitted successfully');
      setMessage('');
      setIsAnonymous(false);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      alert('Failed to submit feedback');
    }
  };

  return (
    <form onSubmit={submitFeedback} className="space-y-4 p-4 bg-white shadow-md rounded">
      <textarea
        placeholder="Enter your feedback"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={isAnonymous}
          onChange={() => setIsAnonymous(!isAnonymous)}
          className="mr-2"
        />
        Submit anonymously
      </label>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Submit Feedback
      </button>
    </form>
  );
}

export default FeedbackForm;
