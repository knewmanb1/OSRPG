import React from 'react';
import { GameProvider } from './context/GameContext';
import Tabs from './components/Tabs';
import useGameLoop from './utils/gameLoop';

const App = () => {
  return (
    <GameProvider>
      {/** Call useGameLoop inside this provider, typically in a child component */}
      <GameLoopHandler /> 
      
      <div className="game-layout">
        <Tabs />
      </div>
    </GameProvider>
  );
};

// Create a separate component to handle the game loop
const GameLoopHandler = () => {
  useGameLoop(); // Call useGameLoop here
  return null; // No UI needed
};

export default App;
