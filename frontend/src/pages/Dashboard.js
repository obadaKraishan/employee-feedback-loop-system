import React, { useState, useEffect } from 'react';
import FeedbackList from '../components/FeedbackList';
import Insights from '../components/Insights';
import EmployeeList from '../components/EmployeeList';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 bg-gray-800 text-white">
        <h2 className="text-xl font-bold p-4">Menu</h2>
        <ul>
          <li className="p-4 hover:bg-gray-700"><Link to="/">Home</Link></li>
          <li className="p-4 hover:bg-gray-700"><Link to="/dashboard">Dashboard</Link></li>
          <li className="p-4 hover:bg-gray-700"><Link to="/feedback">Submit Feedback</Link></li>
        </ul>
      </div>
      <div className="w-full md:w-3/4 p-6">
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
