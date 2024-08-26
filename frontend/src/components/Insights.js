import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Register the required components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Insights() {
  const [chartData, setChartData] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/feedback`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        if (data && data.length > 0) {
          const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Sales'];
          const sentimentData = departments.map(dept => {
            const deptFeedbacks = data.filter(fb => fb.department === dept);
            const avgSentiment = deptFeedbacks.length
              ? deptFeedbacks.reduce((sum, fb) => sum + fb.sentimentScore, 0) / deptFeedbacks.length
              : 0;
            return avgSentiment;
          });

          setChartData({
            labels: departments,
            datasets: [
              {
                label: 'Average Sentiment Score by Department',
                data: sentimentData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized: Token might be invalid or expired.', error);
          alert('Session expired. Please log in again.');
          localStorage.removeItem('userInfo');
          navigate('/login'); // Use navigate to redirect to login page
        } else {
          console.error('Error fetching feedback data:', error);
          alert('Error fetching feedback data. Please check the console for details.');
        }
      }
    };

    fetchFeedbackData();
  }, [navigate]);

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold">Actionable Insights</h2>
      {chartData ? (
        <Bar data={chartData} />
      ) : (
        <p>No data available to display the chart.</p>
      )}
    </div>
  );
}

export default Insights;
