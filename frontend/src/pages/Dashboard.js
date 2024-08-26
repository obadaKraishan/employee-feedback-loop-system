import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedbackList from '../components/FeedbackList';
import Insights from '../components/Insights';
import EmployeeList from '../components/EmployeeList';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!userInfo || userInfo.role === 'Employee') {
      navigate('/login');
    }

    const fetchFeedbacks = async () => {
      let url = `${process.env.REACT_APP_API_URL}/api/feedback`;
      if (userInfo.role === 'Manager') {
        url += `/department/${userInfo.department}`;
      } else if (userInfo.role === 'CEO') {
        url = `${process.env.REACT_APP_API_URL}/api/feedback`;
      }

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setFeedbacks(data.slice(0, 5));
    };

    const fetchEmployees = async () => {
      let url = `${process.env.REACT_APP_API_URL}/api/employees`;
      if (userInfo.role === 'Manager') {
        url += `/department/${userInfo.department}`;
      }

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setEmployees(data.slice(0, 5));
    };

    fetchFeedbacks();
    fetchEmployees();
  }, [navigate, userInfo]);

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {employees.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-2">Employee Overview</h2>
            <EmployeeList employees={employees} />
          </section>
        )}

        {feedbacks.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-2">Recent Feedback</h2>
            <FeedbackList feedbacks={feedbacks} />
          </section>
        )}

        {userInfo.role !== 'Employee' && <Insights />}
      </div>
    </div>
  );
}

export default Dashboard;
