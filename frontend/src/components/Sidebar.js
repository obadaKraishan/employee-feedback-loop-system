import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <div className="w-full md:w-1/4 bg-gray-800 text-white">
      <h2 className="text-xl font-bold p-4">Menu</h2>
      <ul>
        <li className="p-4 hover:bg-gray-700"><Link to="/">Home</Link></li>
        {userInfo && userInfo.role === 'CEO' && (
          <>
            <li className="p-4 hover:bg-gray-700"><Link to="/dashboard">Dashboard</Link></li>
            <li className="p-4 hover:bg-gray-700"><Link to="/employees">All Employees</Link></li>
            <li className="p-4 hover:bg-gray-700"><Link to="/feedbacks">All Feedback</Link></li>
          </>
        )}
        {userInfo && userInfo.role === 'Manager' && (
          <>
            <li className="p-4 hover:bg-gray-700"><Link to="/dashboard">Dashboard</Link></li>
            <li className="p-4 hover:bg-gray-700"><Link to="/employees">My Department Employees</Link></li>
            <li className="p-4 hover:bg-gray-700"><Link to="/feedbacks">My Department Feedback</Link></li>
          </>
        )}
        {userInfo && userInfo.role === 'Employee' && (
          <>
            <li className="p-4 hover:bg-gray-700"><Link to="/my-feedbacks">My Feedback</Link></li>
            <li className="p-4 hover:bg-gray-700"><Link to="/profile">My Profile</Link></li>
            <li className="p-4 hover:bg-gray-700"><Link to="/bot-interaction">Bot Interaction</Link></li> {/* New Bot Interaction Link */}
          </>
        )}
        <li className="p-4 hover:bg-gray-700">
          <Link to="/notifications">Notifications</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <button onClick={logoutHandler} className="w-full text-left">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
