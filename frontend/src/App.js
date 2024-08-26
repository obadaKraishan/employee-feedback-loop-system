import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Feedback from './pages/Feedback';
import Dashboard from './pages/Dashboard';
import AllEmployees from './pages/AllEmployees';
import AllFeedbacks from './pages/AllFeedbacks';
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
            <Route path="/feedback" element={userInfo ? <Feedback /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={userInfo ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/employees" element={userInfo ? <AllEmployees /> : <Navigate to="/login" />} />
            <Route path="/feedbacks" element={userInfo ? <AllFeedbacks /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
