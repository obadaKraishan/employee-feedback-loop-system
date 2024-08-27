import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsPerPage] = useState(20);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUserRole(userInfo.role);
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/notifications`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setNotifications(data || []); // Ensure data is an array
        setFilteredNotifications(data || []); // Initial filtering
        setUnreadCount((data || []).filter(notif => !notif.isRead).length);
      } catch (error) {
        console.error('Failed to fetch notifications', error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    filterNotifications();
  }, [searchTerm, dateFilter, departmentFilter]);

  const filterNotifications = () => {
    let filtered = [...notifications];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(notification =>
        notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date
    const now = new Date();
    switch (dateFilter) {
      case '24h':
        filtered = filtered.filter(notification => 
          new Date(notification.timestamp) >= new Date(now.setDate(now.getDate() - 1))
        );
        break;
      case 'week':
        filtered = filtered.filter(notification => 
          new Date(notification.timestamp) >= new Date(now.setDate(now.getDate() - 7))
        );
        break;
      case 'month':
        filtered = filtered.filter(notification => 
          new Date(notification.timestamp) >= new Date(now.setMonth(now.getMonth() - 1))
        );
        break;
      case 'year':
        filtered = filtered.filter(notification => 
          new Date(notification.timestamp) >= new Date(now.setFullYear(now.getFullYear() - 1))
        );
        break;
      default:
        break;
    }

    // Filter by department (CEO sees everything, others see only department-specific)
    if (userRole !== 'CEO' && departmentFilter) {
      filtered = filtered.filter(notification => 
        notification.department === departmentFilter
      );
    }

    setFilteredNotifications(filtered);
  };

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

  // Pagination logic
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = filteredNotifications.slice(indexOfFirstNotification, indexOfLastNotification);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 bg-white rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      <div className="mb-2">
        <p>Unread Notifications: {unreadCount}</p>
      </div>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search notifications..."
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Date Filter */}
      <select
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      >
        <option value="all">All Time</option>
        <option value="24h">Last 24 Hours</option>
        <option value="week">Last Week</option>
        <option value="month">Last Month</option>
        <option value="year">Last Year</option>
      </select>

      {/* Department Filter (CEO only) */}
      {userRole === 'CEO' && (
        <select
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          {/* Replace these options with dynamic department list */}
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
        </select>
      )}

      {/* Notification List */}
      <ul className="space-y-2">
        {currentNotifications.length > 0 ? (
          currentNotifications.map((notification) => (
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

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(filteredNotifications.length / notificationsPerPage)).keys()].map(number => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`px-4 py-2 mx-1 border rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
