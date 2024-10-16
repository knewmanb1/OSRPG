import React from 'react';
import { useGameContext } from '../context/GameContext';

const PlayerStats = () => {
    const { playerStats, spendPoints } = useGameContext();

    // Function to handle stat upgrades
    const handleUpgrade = (stat) => {
        const pointsSpent = playerStats[stat] || 0; // Track how many points have been spent on this stat
        const currentCost = Math.floor(pointsSpent / 10) + 1; // Cost increases after every 10 points spent

        if (playerStats.pointsToSpend >= currentCost) {
            spendPoints(stat, currentCost); // Spend points based on current cost
        } else {
            console.log('Not enough points to spend on this stat');
        }
    };

    // Helper to calculate the cost of upgrading a stat
    const getUpgradeCost = (stat) => {
        const pointsSpent = playerStats[stat] || 0;
        return Math.floor(pointsSpent / 10) + 1;
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
                {['con', 'str', 'dex', 'int', 'wis', 'per'].map((stat) => {
                    const upgradeCost = getUpgradeCost(stat);

                    return (
                        <div className="stat" key={stat}>
                            <span>{stat.charAt(0).toUpperCase() + stat.slice(1)}: {playerStats[stat]}</span>
                            {playerStats.pointsToSpend >= upgradeCost && (
                                <button onClick={() => handleUpgrade(stat)}>
                                    +1 ({upgradeCost})
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PlayerStats;
