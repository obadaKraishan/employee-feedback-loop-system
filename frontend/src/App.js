import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Feedback from './pages/Feedback';
import Dashboard from './pages/Dashboard';
import AllEmployees from './pages/AllEmployees';
import AllFeedbacks from './pages/AllFeedbacks';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<AllEmployees />} />
            <Route path="/feedbacks" element={<AllFeedbacks />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
