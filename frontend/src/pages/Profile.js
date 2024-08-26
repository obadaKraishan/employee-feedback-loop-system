import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

function Profile() {
  const [employee, setEmployee] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/employees/profile`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setEmployee(data);
      setName(data.name);
      setEmail(data.email);
    };

    fetchEmployeeDetails();
  }, []);

  const updateProfile = async () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    await axios.put(`${process.env.REACT_APP_API_URL}/api/employees/profile`, {
      name,
      email,
      password,
    }, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    setMessage('Profile updated successfully');
  };

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>

        {message && <p className="text-green-500">{message}</p>}

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button onClick={updateProfile} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
