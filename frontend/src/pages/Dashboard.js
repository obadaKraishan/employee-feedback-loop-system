import React from 'react';
import FeedbackList from '../components/FeedbackList';
import Insights from '../components/Insights';
import EmployeeList from '../components/EmployeeList';

function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <EmployeeList />
      <FeedbackList />
      <Insights />
    </div>
  );
}

export default Dashboard;
