import React, { useEffect, useRef } from 'react';
import '../styles/App.css'; // Ensure to import your CSS file
import { useGameContext } from '../context/GameContext';

const CombatWindow = () => {
  const { combatLog } = useGameContext(); // Use context to get combatLog
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
      <div className="combat-log">
        {combatLog.length > 0 ? (
          <div>
            {combatLog.map((logEntry, index) => (
              <p className={`combat-ticker ${logEntry.category}`} key={index}>
                {logEntry.message}
              </p>
            ))}
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
