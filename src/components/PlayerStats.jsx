import React from 'react';
import { useGameContext } from '../context/GameContext';

const PlayerStats = () => {
    const { playerStats, spendPoints } = useGameContext();

    // Function to handle stat upgrades
    const handleUpgrade = (stat) => {
        if (playerStats.pointsToSpend > 0) {
            spendPoints(stat, 1); // Spend 1 point per click
        }
    };

    return (
        <div className="player-stats">
            <h2>Player Stats</h2>
            <ul>
                <li>Level: {playerStats.level}</li>
                <li>Experience: {playerStats.experience} / {100 * playerStats.level} {/* Example formula */}</li>
                <li>Health: {playerStats.hp} / {playerStats.hpMax}</li>
                <li>Mana: {playerStats.mp} / {playerStats.mpMax}</li>
                <li>Points to Spend: {playerStats.pointsToSpend}</li>
            </ul>
            
            {/* Display upgradeable stats */}
            <div className="upgrade-stats">
                <h3>Upgrade Stats</h3>
                <div className="stat">
                    <span>Constitution: {playerStats.con}</span>
                    <button onClick={() => handleUpgrade('con')} disabled={playerStats.pointsToSpend <= 0}>+1</button>
                </div>
                <div className="stat">
                    <span>Strength: {playerStats.str}</span>
                    <button onClick={() => handleUpgrade('str')} disabled={playerStats.pointsToSpend <= 0}>+1</button>
                </div>
                <div className="stat">
                    <span>Dexterity: {playerStats.dex}</span>
                    <button onClick={() => handleUpgrade('dex')} disabled={playerStats.pointsToSpend <= 0}>+1</button>
                </div>
                <div className="stat">
                    <span>Intelligence: {playerStats.int}</span>
                    <button onClick={() => handleUpgrade('int')} disabled={playerStats.pointsToSpend <= 0}>+1</button>
                </div>
                <div className="stat">
                    <span>Wisdom: {playerStats.wis}</span>
                    <button onClick={() => handleUpgrade('wis')} disabled={playerStats.pointsToSpend <= 0}>+1</button>
                </div>
                <div className="stat">
                    <span>Perception: {playerStats.per}</span>
                    <button onClick={() => handleUpgrade('per')} disabled={playerStats.pointsToSpend <= 0}>+1</button>
                </div>
            </div>
        </div>
    );
};

export default PlayerStats;
