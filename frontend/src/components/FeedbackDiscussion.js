import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FeedbackDiscussion({ feedbackId, comments, onNewComment }) {
  const [newComment, setNewComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const submitComment = async () => {
    try {
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
      setNewComment('');
      setIsAnonymous(false);
      onNewComment(data); // Update the parent component with the new comment

      // Show success toast
      setToastType('success');
      setToastMessage('Comment added successfully');
      setShowToast(true);
    } catch (error) {
      console.error('Failed to submit comment', error);
      // Show error toast
      setToastType('error');
      setToastMessage('Failed to add comment. Please try again.');
      setShowToast(true);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold">Discussion</h2>
      {comments.length > 0 ? (
        <ul className="space-y-2">
          {comments.map((comment, index) => (
            <li key={index} className="p-2 bg-white shadow rounded">
              <strong>{comment.isAnonymous ? 'Anonymous' : comment.commenter}:</strong> {comment.commentText}
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
      />
      <label className="inline-flex items-center mt-2">
        <input
          type="checkbox"
          className="form-checkbox"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
        />
        <span className="ml-2">Submit as Anonymous</span>
      </label>
      <button
        onClick={submitComment}
        className="w-full bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
      >
        Submit Comment
      </button>

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed bottom-4 right-4 p-4 rounded shadow-lg ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default FeedbackDiscussion;
