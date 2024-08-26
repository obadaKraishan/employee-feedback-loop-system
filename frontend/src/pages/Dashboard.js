import React, { useState, useEffect } from 'react';
import FeedbackList from '../components/FeedbackList';
import Insights from '../components/Insights';
import EmployeeList from '../components/EmployeeList';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/feedback`);
      setFeedbacks(data.slice(0, 5)); // Show only the first 5 feedbacks
    };

    const fetchEmployees = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/employees`);
      setEmployees(data.slice(0, 5)); // Show only the first 5 employees
    };

    fetchFeedbacks();
    fetchEmployees();
  }, []);

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Employee Overview</h2>
          <EmployeeList employees={employees} />
          <Link to="/employees" className="text-blue-500 hover:underline">View All Employees</Link>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Recent Feedback</h2>
          <FeedbackList feedbacks={feedbacks} />
          <Link to="/feedbacks" className="text-blue-500 hover:underline">View All Feedback</Link>
        </section>

        <section>
          <Insights />
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
