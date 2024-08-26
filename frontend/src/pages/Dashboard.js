import React from 'react';
import FeedbackList from '../components/FeedbackList';
import Insights from '../components/Insights';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <FeedbackList />
      <Insights />
    </div>
  );
}

export default Dashboard;
