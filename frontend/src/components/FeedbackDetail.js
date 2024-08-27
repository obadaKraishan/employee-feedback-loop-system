// src/components/FeedbackDetail.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import FeedbackDiscussion from './FeedbackDiscussion'; 

function FeedbackDetail() {
  const { feedbackId } = useParams(); // Ensure feedbackId is a string
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbackDetail = async () => {
      try {
        console.log('Fetching user info from localStorage');
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        console.log('User info:', userInfo);

        if (!userInfo || !userInfo.token) {
          console.error('User not authenticated, redirecting to login.');
          navigate('/login'); // Redirect to login if user is not authenticated
          return;
        }

        console.log('Fetching feedback details from API with feedback ID:', feedbackId);
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/feedback/${feedbackId}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        console.log('Fetched feedback details:', data);
        setFeedback(data);
      } catch (error) {
        console.error('Failed to fetch feedback details', error);
        if (error.response && error.response.status === 401) {
          navigate('/login'); // Redirect to login if unauthorized
        }
      }
    };

    fetchFeedbackDetail();
  }, [feedbackId, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow p-4">
          <button className="text-blue-500 hover:underline mb-4" onClick={() => navigate(-1)}>
            ← Back to Notifications
          </button>
          {feedback ? (
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">Feedback Details</h2>
              <p><strong>Sender:</strong> {feedback.employeeId?.name || 'Anonymous'}</p>
              <p><strong>Message:</strong> {feedback.message}</p>
              <p><strong>Status:</strong> {feedback.status}</p>
              <p className="text-gray-500 text-sm mt-4">{new Date(feedback.date).toLocaleString()}</p>
              
              <FeedbackDiscussion
                feedbackId={feedback._id}
                comments={feedback.comments}
                status={feedback.status}
                onNewComment={(comment) => setFeedback(prev => ({ ...prev, comments: [...prev.comments, comment] }))}
                onStatusChange={(newStatus) => setFeedback(prev => ({ ...prev, status: newStatus }))}
              />
            </div>
          ) : (
            <p>Loading feedback details...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeedbackDetail;
