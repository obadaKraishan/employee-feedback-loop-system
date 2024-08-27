// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import Home from './pages/Home';
import MyFeedbacks from './pages/MyFeedbacks';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import AllEmployees from './pages/AllEmployees';
import AllFeedbacks from './pages/AllFeedbacks';
import NotificationsPage from './pages/Notifications';
import NotificationDetail from './components/NotificationDetail'; 
import FeedbackDetail from './components/FeedbackDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';

function App() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {userInfo ? (
              <>
                {userInfo.role === 'Employee' ? (
                  <>
                    <Route path="/my-feedbacks" element={<MyFeedbacks />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/notifications/:notificationId" element={<NotificationDetail />} />
                    <Route path="/feedbacks/:feedbackId" element={<FeedbackDetail />} />
                    <Route path="*" element={<Navigate to="/my-feedbacks" replace />} />
                  </>
                ) : (
                  <>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/employees" element={<AllEmployees />} />
                    <Route path="/feedbacks" element={<AllFeedbacks />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/notifications/:notificationId" element={<NotificationDetail />} />
                    <Route path="/feedbacks/:feedbackId" element={<FeedbackDetail />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </>
                )}
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
