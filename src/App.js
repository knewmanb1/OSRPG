import React from 'react';
import { GameProvider } from './context/GameContext';
import GameLayout from './components/GameLayout';

const App = () => {
  return (
    <GameProvider>
      <div className="game-layout">
        <GameLayout/>
      </div>
    </GameProvider>
  );
};

export default App;
