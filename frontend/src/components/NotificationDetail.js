// src/components/NotificationDetail.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

function NotificationDetail() {
  const { notificationId } = useParams();
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotificationDetail = async () => {
      try {
        console.log('Fetching user info from localStorage');
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        console.log('User info:', userInfo);

        if (!userInfo || !userInfo.token) {
          console.error('User not authenticated, redirecting to login.');
          navigate('/login'); // Redirect to login if user is not authenticated
          return;
        }

        console.log('Fetching notification details from API with ID:', notificationId);
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/notifications/${notificationId}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        console.log('Fetched notification details:', data);
        setNotification(data);
      } catch (error) {
        console.error('Failed to fetch notification details', error);
        if (error.response && error.response.status === 401) {
          navigate('/login'); // Redirect to login if unauthorized
        }
      }
    };

    fetchNotificationDetail();
  }, [notificationId, navigate]);

  const handleViewFeedback = () => {
    if (notification && notification.relatedFeedback) {
      const feedbackId = notification.relatedFeedback._id; // Extract the ID from the relatedFeedback object
      console.log('Navigating to feedback details with ID:', feedbackId);
      navigate(`/feedbacks/${feedbackId}`); // Use the ID string for navigation
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow p-4">
          <button className="text-blue-500 hover:underline mb-4" onClick={() => navigate(-1)}>
            ← Back to Notifications
          </button>
          {notification ? (
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">Notification Details</h2>
              <p><strong>Type:</strong> {notification.type}</p>
              <p><strong>Message:</strong> {notification.message}</p>
              <p><strong>Related Feedback:</strong> 
                <button onClick={handleViewFeedback} className="text-blue-500 hover:underline">View Feedback</button>
              </p>
              <p className="text-gray-500 text-sm mt-4">{new Date(notification.timestamp).toLocaleString()}</p>
            </div>
          ) : (
            <p>Loading notification details...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationDetail;
