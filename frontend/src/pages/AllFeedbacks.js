import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FeedbackList from '../components/FeedbackList';
import Sidebar from '../components/Sidebar';

function AllFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/feedback`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        setFeedbacks(data);
      } catch (error) {
        console.error('Failed to fetch feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">All Feedback</h1>
        <FeedbackList feedbacks={feedbacks} />
      </div>
    </div>
  );
}

export default AllFeedbacks;
