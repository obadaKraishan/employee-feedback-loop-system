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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!userInfo || userInfo.role === 'Employee') {
      navigate('/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        // URLs based on user role
        let feedbackUrl = `${process.env.REACT_APP_API_URL}/api/feedback`;
        let employeeUrl = `${process.env.REACT_APP_API_URL}/api/employees`;

        if (userInfo.role === 'Manager') {
          feedbackUrl += `/department/${userInfo.department}`;
          employeeUrl += `/department/${userInfo.department}`;
        }

        // Fetch both feedbacks and employees simultaneously
        const [feedbackResponse, employeeResponse] = await Promise.all([
          axios.get(feedbackUrl, {
            headers: {
              Authorization: `Bearer ${userInfo.token}`, // Include the token
            },
          }),
          axios.get(employeeUrl, {
            headers: {
              Authorization: `Bearer ${userInfo.token}`, // Include the token
            },
          }),
        ]);

        console.log('Feedbacks:', feedbackResponse.data);
        console.log('Employees:', employeeResponse.data);

        setFeedbacks(feedbackResponse.data.slice(0, 5));
        setEmployees(employeeResponse.data.slice(0, 5));
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching dashboard data:', error);

        if (error.response && error.response.status === 401) {
          console.error('Unauthorized: Token might be invalid or expired.', error);
          alert('Session expired. Please log in again.');
          localStorage.removeItem('userInfo');
          navigate('/login');
        } else if (error.message === 'Network Error') {
          alert('Network error. Please check your server and try again.');
        } else {
          alert('Error fetching dashboard data. Please check the console for details.');
        }
      }
    };

    fetchDashboardData();
  }, [navigate, userInfo]);

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while data is being fetched
  }

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
