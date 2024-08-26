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

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/feedback`);
        
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
        console.error('Error fetching feedback data:', error);
      }
    };

    fetchFeedbackData();
  }, []);

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
