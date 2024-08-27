// src/components/Notifications.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/notifications`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setNotifications(data || []); // Ensure data is an array
        setUnreadCount((data || []).filter(notif => !notif.isRead).length);
      } catch (error) {
        console.error('Failed to fetch notifications', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = async (notificationId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const notification = notifications.find(notif => notif._id === notificationId);
      if (!notification.isRead) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/notifications/${notificationId}/read`, {}, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        setNotifications(notifications.map(notif =>
          notif._id === notificationId ? { ...notif, isRead: true } : notif
        ));
        setUnreadCount(unreadCount - 1);
      }

      navigate(`/notifications/${notificationId}`);
    } catch (error) {
      console.error('Failed to mark notification as read', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      <div className="mb-2">
        Unread Notifications: {unreadCount}
      </div>
      <ul className="space-y-2">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <li
              key={notification._id}
              className={`p-4 rounded shadow-sm flex items-center justify-between cursor-pointer ${notification.isRead ? 'bg-gray-200' : 'bg-blue-100'}`}
              onClick={() => handleNotificationClick(notification._id)}
            >
              <div className="flex items-center">
                {notification.isRead ? <FaEnvelopeOpen className="mr-2 text-gray-600" /> : <FaEnvelope className="mr-2 text-blue-600" />}
                <div>
                  <p className="font-bold">{notification.type}</p>
                  <p>{notification.message}</p>
                  <p className="text-xs text-gray-500">{new Date(notification.timestamp).toLocaleString()}</p>
                </div>
              </div>
              <Link to={`/feedbacks/${notification.relatedFeedback}`} className="text-blue-500 hover:underline">
                View Feedback
              </Link>
            </li>
          ))
        ) : (
          <p>No notifications available.</p>
        )}
      </ul>
    </div>
  );
}

export default Notifications;
