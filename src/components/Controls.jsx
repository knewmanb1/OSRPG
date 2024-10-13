import React from 'react';
import { useGameContext } from '../context/GameContext';

const Controls = () => {
    const { move,rest, playerStats, setPlayerStats, currentRoom } = useGameContext();

    const handleMove = (direction) => {
        move(direction);
    };
    const handleLevelUp = () => {
        if (playerStats.experience >= playerStats.expToNextLevel) {
            const statPointsGained = 2; // Example: 2 points per level
    
            // Update player stats
            setPlayerStats((prevStats) => {
                const newLevel = prevStats.level + 1;
                const newExperience = prevStats.experience - prevStats.expToNextLevel;
                const newExpToNextLevel = prevStats.expToNextLevel + 50; // Increase exp requirement (adjust as needed)
    
                // Recalculate HP and MP
                const newHP = prevStats.hpMax + Math.floor(((prevStats.con-10) * 10) + ((prevStats.str-10) * 2.5)); // Example calculation
                const newMP = prevStats.mpMax + Math.floor(((prevStats.int-10) * 10) + ((prevStats.wis-10) * 2.5)); // Example calculation
                console.log(newHP, newMP, prevStats.con, prevStats.hpMax, Math.floor((prevStats.con-10 * 10) + (prevStats.str-10 * 2.5)));
                return {
                    ...prevStats,
                    level: newLevel,
                    experience: newExperience,
                    expToNextLevel: newExpToNextLevel,
                    pointsToSpend: (prevStats.pointsToSpend || 0) + statPointsGained, // Add new stat points
                    hpMax: newHP,
                    mpMax: newMP
                };
            });
        }
    };

    return (
        <div>

        
        <div className="controls" style={{ marginTop: '10px', textAlign: 'center', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {/* First Row */}
            <button className="direction-button" onClick={() => handleMove('Northwest')}>NW</button>
            <button className="direction-button" onClick={() => handleMove('North')}>N</button>
            <button className="direction-button" onClick={() => handleMove('Northeast')}>NE</button>
            {/* Second Row */}
            <button className="direction-button" onClick={() => handleMove('West')}>W</button>
            <button className="direction-button" onClick={rest}>Rest</button>
            <button className="direction-button" onClick={() => handleMove('East')}>E</button>
            {/* Third Row */}
            <button className="direction-button" onClick={() => handleMove('Southwest')}>SW</button>
            <button className="direction-button" onClick={() => handleMove('South')}>S</button>
            <button className="direction-button" onClick={() => handleMove('Southeast')}>SE</button>
            {/* Fourth Row */}
            <button className="direction-button" onClick={() => handleMove('Up')}>Up</button>
            <button style={{ visibility: 'hidden' }}></button> {/* Center button is blank */}
            <button className="direction-button" onClick={() => handleMove('Down')}>Down</button>
            
        </div>
        {/* Check if the player is in the Training Hall and has enough experience */}
        {currentRoom.hasTrainer && playerStats.experience >= playerStats.expToNextLevel && (
            <button className="level-up-button" onClick={handleLevelUp}>Level Up</button>
            )}
        </div>
    );
};

export default Controls;
