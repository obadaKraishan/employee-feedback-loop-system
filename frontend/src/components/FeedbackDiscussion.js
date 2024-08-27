import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FeedbackDiscussion({ feedbackId, comments, status, onNewComment, onStatusChange }) {
  const [newComment, setNewComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [newStatus, setNewStatus] = useState(status);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.role) {
      setUserRole(userInfo.role);
    }
    console.log('User Role:', userRole);
  }, []);

  useEffect(() => {
    if (status !== newStatus) {
      setNewStatus(status);
    }
    console.log('Status prop changed:', status);
  }, [status]);

  const submitComment = async () => {
    try {
      console.log('Submitting comment:', newComment);
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/feedback/${feedbackId}/comment`,
        {
          commentText: newComment,
          isAnonymous: isAnonymous,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      console.log('Comment submitted:', data);
      setNewComment('');
      setIsAnonymous(false);
      if (typeof onNewComment === 'function') {
        onNewComment(data); 
      }

      setToastType('success');
      setToastMessage('Comment added successfully');
      setShowToast(true);
    } catch (error) {
      console.error('Failed to submit comment', error);
      setToastType('error');
      setToastMessage('Failed to add comment. Please try again.');
      setShowToast(true);
    }
  };

  const updateStatus = async () => {
    try {
      console.log('Updating status to:', newStatus);
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/feedback/${feedbackId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      console.log('Status updated:', data.status);
      if (typeof onStatusChange === 'function') {
        onStatusChange(data.status);
      }

      setToastType('success');
      setToastMessage('Status updated successfully');
      setShowToast(true);
    } catch (error) {
      console.error('Failed to update status', error);
      setToastType('error');
      setToastMessage('Failed to update status. Please try again.');
      setShowToast(true);
    }
  };

  useEffect(() => {
    if (showToast) {
      console.log('Showing toast:', toastMessage);
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast, toastMessage]);

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold">Discussion</h2>
      <div className="mb-4">
        <label className="font-semibold">Status:</label>
        <select
          className="ml-2 p-2 border border-gray-300 rounded"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          disabled={userRole === 'Employee' && status === 'Closed'}
        >
          <option value="Open" disabled={userRole === 'Employee' && status !== 'Open'}>
            Open
          </option>
          <option value="Under Process" disabled={userRole === 'Employee'}>
            Under Process
          </option>
          <option value="Closed" disabled={userRole === 'Employee' && status === 'Closed'}>
            Closed
          </option>
        </select>
        <button
          onClick={updateStatus}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={userRole === 'Employee' && (status === 'Closed' || newStatus !== 'Closed')}
        >
          Update Status
        </button>
      </div>
      {comments.length > 0 ? (
        <ul className="space-y-2">
          {comments.map((comment, index) => (
            <li key={index} className="p-2 bg-white shadow rounded">
              <strong>{comment.isAnonymous ? 'Anonymous' : comment.commenter?.name || 'Unknown'}</strong>
              {comment.commentText}
              <div className="text-sm text-gray-600">{new Date(comment.timestamp).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet</p>
      )}
      <textarea
        className="w-full p-2 mt-4 border border-gray-300 rounded"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
        disabled={userRole === 'Employee' && status === 'Closed'}
      />
      <label className="inline-flex items-center mt-2">
        <input
          type="checkbox"
          className="form-checkbox"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          disabled={userRole === 'Employee' && status === 'Closed'}
        />
        <span className="ml-2">Submit as Anonymous</span>
      </label>
      <button
        onClick={submitComment}
        className="w-full bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
        disabled={userRole === 'Employee' && status === 'Closed'}
      >
        Submit Comment
      </button>

      {showToast && (
        <div className={`toast-notification ${toastType}`}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default FeedbackDiscussion;
