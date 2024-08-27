import React from 'react';
import Sidebar from '../components/Sidebar';
import Notifications from '../components/Notifications';

function NotificationsPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        <Notifications />
      </div>
    </div>
  );
}

export default NotificationsPage;
