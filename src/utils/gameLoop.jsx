import { useGameContext } from '../context/GameContext';
import { useState, useEffect } from 'react';

const TICK_INTERVAL = 2000; // 2 seconds per tick

const useGameLoop = () => {
    const { monsters, setMonsters, playerPos, playerStats, setPlayerStats, updateMonstersInRoom } = useGameContext();
    const [combatLog, setCombatLog] = useState([]); // Stores combat events

    // Helper function to calculate player damage
    const calculatePlayerDamage = () => {
        const baseDamage = playerStats.str + (playerStats.dex * 0.5); // Modify damage formula as needed
        return Math.floor(baseDamage); // Return integer damage
    };

    // Helper function to calculate monster damage
    const calculateMonsterDamage = (monster) => {
        if (monster && monster.str) {
            const baseDamage = monster.str; // Modify this as needed
            return Math.floor(baseDamage);
        } else {
            console.error('Monster strength is undefined or invalid:', monster);
            return 0; // Return 0 damage if the monster's strength is not defined
        }
    };

    const passiveRegeneration = () => {
        const regenAmountHP = Math.floor(playerStats.con * 0.1); // Regenerates based on constitution
        const regenAmountMP = Math.floor(playerStats.wis * 0.1); // Regenerates based on wisdom
        
        setPlayerStats(prevStats => ({
            ...prevStats,
            hp: Math.min(prevStats.hpMax, prevStats.hp + regenAmountHP),
            mp: Math.min(prevStats.mpMax, prevStats.mp + regenAmountMP),
        }));
    };

    // Combat turn handling logic
    const combatTurn = () => {
        if (monsters.length > 0) {
            let newCombatLog = [...combatLog];

            // Player attacks the first monster in the list (if it exists)
            const firstMonster = monsters[0];
            if (firstMonster) {
                const playerDamage = calculatePlayerDamage();
                firstMonster.hp -= playerDamage;

                newCombatLog.push(`You hit the ${firstMonster.name} for ${playerDamage} damage!`);

                if (firstMonster.hp <= 0) {
                    newCombatLog.push(`The ${firstMonster.name} has been slain!`);
                    newCombatLog.push(`You gain ${firstMonster.exp} experience.`);
                    const updatedExperience = playerStats.experience + firstMonster.exp;

                    // Update player experience and check level-up
                    setPlayerStats((prevStats) => ({
                        ...prevStats,
                        experience: updatedExperience
                    }));
                    
                    // Remove the slain monster
                    const updatedMonsters = monsters.filter(monster => monster.hp > 0);
                    updateMonstersInRoom(updatedMonsters); // Update room and state with surviving monsters
                    setMonsters(updatedMonsters); // Set updated monsters in state
                }
            }

            // Monsters attack the player
            monsters.forEach((monster) => {
                if (monster.hp > 0) {
                    const monsterDamage = calculateMonsterDamage(monster);
                    
                    setPlayerStats(prevStats => ({
                        ...prevStats,
                        hp: Math.max(prevStats.hp - monsterDamage, 0) // Ensure HP doesn't go below 0
                    }));

                    newCombatLog.push(`The ${monster.name} hits you for ${monsterDamage} damage!`);

                    if (playerStats.hp <= 0) {
                        newCombatLog.push('You have been slain!');
                    }
                }
            });

            // Update combat log
            setCombatLog(newCombatLog);
        }
    };

    useEffect(() => {
        const gameLoopInterval = setInterval(() => {
            combatTurn(); // Call combat turn every tick
            passiveRegeneration(); // Regeneration every turn
        }, TICK_INTERVAL);

        return () => clearInterval(gameLoopInterval); // Cleanup on unmount
    }, [monsters, playerStats]); // Ensure to include necessary dependencies

    return { combatLog };
};

export default useGameLoop;
