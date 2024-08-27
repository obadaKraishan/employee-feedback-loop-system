import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

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

  const markAsRead = async (notificationId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      await axios.put(`${process.env.REACT_APP_API_URL}/api/notifications/${notificationId}/read`, {}, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setNotifications(notifications.map(notif =>
        notif._id === notificationId ? { ...notif, isRead: true } : notif
      ));
      setUnreadCount(unreadCount - 1);
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
              className={`p-2 rounded ${notification.isRead ? 'bg-gray-200' : 'bg-blue-100'}`}
              onClick={() => markAsRead(notification._id)}
            >
              {notification.message}
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
