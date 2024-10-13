import React, { useEffect, useRef } from 'react';
import useGameLoop from '../utils/gameLoop';
import '../styles/App.css'; // Ensure to import your CSS file
import { useGameContext } from '../context/GameContext';

const CombatWindow = () => {
  const { playerStats } = useGameContext();
  const { combatLog } = useGameLoop(); // Use the game loop
  const logEndRef = useRef(null); // Reference to the end of the log

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to the bottom whenever combatLog updates
  useEffect(() => {
    scrollToBottom();
  }, [combatLog]);

  return (
    <div className="combat-window">
      <h2>Combat Log</h2>
      <div className="combat-log-container">
        {combatLog.length > 0 ? (
          <div>
            {combatLog.map((logEntry, index) => {
              let messageClass = '';

              // Determine class based on message content
              if (logEntry.includes('hit')) {
                messageClass = 'player-action'; // Player action
              } else if (logEntry.includes('hits you')) {
                messageClass = 'monster-action'; // Monster action
              } else if (logEntry.includes('slain')) {
                messageClass = 'death-message'; // Death message
              }

              return (
                <p className={`combat-ticker ${messageClass}`} key={index}>
                  {logEntry}
                </p>
              );
            })}
            {/* This element will stay at the bottom */}
            <div ref={logEndRef} />
          </div>
        ) : (
          <p>No combat actions yet.</p>
        )}
      </div>
    </div>
  );
};

export default CombatWindow;
