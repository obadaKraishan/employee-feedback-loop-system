import React from 'react';
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary
import BotInteraction from '../components/BotInteraction';

const BotInteractionPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="container mx-auto p-4 flex-grow flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Chat with the Bot</h1>
        <BotInteraction />
      </div>
    </div>
  );
};

export default BotInteractionPage;
