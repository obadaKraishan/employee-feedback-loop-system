import React from 'react';
import BotInteraction from '../components/BotInteraction';

const BotInteractionPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat with the Bot</h1>
      <BotInteraction />
    </div>
  );
};

export default BotInteractionPage;
