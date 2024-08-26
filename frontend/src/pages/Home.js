import React from 'react';
import Sidebar from '../components/Sidebar';

function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold">Welcome to the Employee Feedback Loop System</h1>
      </div>
    </div>
  );
}

export default Home;
