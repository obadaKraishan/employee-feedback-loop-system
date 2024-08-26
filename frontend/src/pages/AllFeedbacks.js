import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FeedbackList from '../components/FeedbackList';

function AllFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/feedback`);
        setFeedbacks(data);
      } catch (error) {
        console.error('Failed to fetch feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Feedback</h1>
      <FeedbackList feedbacks={feedbacks} />
    </div>
  );
}

export default AllFeedbacks;
