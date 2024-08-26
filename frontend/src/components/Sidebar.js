import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-full md:w-1/4 bg-gray-800 text-white">
      <h2 className="text-xl font-bold p-4">Menu</h2>
      <ul>
        <li className="p-4 hover:bg-gray-700"><Link to="/">Home</Link></li>
        <li className="p-4 hover:bg-gray-700"><Link to="/dashboard">Dashboard</Link></li>
        <li className="p-4 hover:bg-gray-700"><Link to="/feedback">Submit Feedback</Link></li>
        <li className="p-4 hover:bg-gray-700"><Link to="/employees">All Employees</Link></li>
        <li className="p-4 hover:bg-gray-700"><Link to="/feedbacks">All Feedback</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
