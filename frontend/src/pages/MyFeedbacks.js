import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import FeedbackDiscussion from '../components/FeedbackDiscussion';

function MyFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/feedback/mine`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setFeedbacks(data);
      } catch (error) {
        console.error('Failed to fetch feedbacks', error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/departments`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setDepartments(data);
      } catch (error) {
        console.error('Failed to fetch departments', error);
      }
    };

    fetchFeedbacks();
    fetchDepartments();
  }, []);

  const handleAddFeedback = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/feedback`,
        {
          message: newFeedback,
          department: selectedDepartment,
          isAnonymous: isAnonymous,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setShowModal(false);
      setNewFeedback('');
      setSelectedDepartment('');
      setIsAnonymous(false);

      // Refresh feedbacks after adding new one
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/feedback/mine`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setFeedbacks(data);
    } catch (error) {
      console.error('Failed to add feedback', error);
    }
  };

  const handleCommentAdded = (newComment) => {
    if (selectedFeedback) {
      setSelectedFeedback({
        ...selectedFeedback,
        comments: [...selectedFeedback.comments, newComment],
      });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">My Feedbacks</h1>
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setShowModal(true)}
        >
          Add Feedback
        </button>

        {feedbacks.map((feedback) => (
          <div key={feedback._id} className="mb-4 p-4 bg-gray-100 rounded shadow">
            <p>{feedback.message}</p>
            <p className="text-sm text-gray-600">Department: {feedback.department}</p>
            <button
              onClick={() => setSelectedFeedback(selectedFeedback === feedback ? null : feedback)}
              className="text-blue-500 hover:underline mt-2"
            >
              {selectedFeedback === feedback ? 'Hide Comments' : 'Show Comments'}
            </button>
            {selectedFeedback === feedback && (
              <FeedbackDiscussion
                feedbackId={feedback._id}
                comments={feedback.comments}
                onNewComment={handleCommentAdded}
              />
            )}
          </div>
        ))}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">Add New Feedback</h2>
              <textarea
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
                placeholder="Enter your feedback"
              />
              <select
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                  />
                  <span className="ml-2">Submit as Anonymous</span>
                </label>
              </div>
              <div className="flex justify-end">
                <button
                  className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleAddFeedback}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyFeedbacks;
