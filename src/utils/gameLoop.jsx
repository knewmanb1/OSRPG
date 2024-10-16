import { useGameContext } from '../context/GameContext';
import { useEffect } from 'react';

const TICK_INTERVAL = 2000; // 2 seconds per tick

const useGameLoop = () => {
    const { monsters, setMonsters, playerStats, setPlayerStats, updateMonstersInRoom, updateCombatLog } = useGameContext();

    // Helper function to calculate player damage
    const calculatePlayerDamage = () => {
        const baseDamage = playerStats.str * 0.5 + (playerStats.dex * 0.2); // Modify damage formula as needed
        return Math.floor(baseDamage); // Return integer damage
    };

    // Helper function to calculate monster damage
    const calculateMonsterDamage = (monster) => {
        if (monster && monster.str) {
            const baseDamage = monster.str * 0.5; // Modify this as needed
            return Math.floor(baseDamage);
        } else {
            console.error('Monster strength is undefined or invalid:', monster);
            return 0; // Return 0 damage if the monster's strength is not defined
        }
    };

    // Helper function to calculate the number of attacks based on speed
    const calculateNumberOfAttacks = (speed) => {
        return Math.floor(speed) + 1; // 1 attack + 1 for every 5 speed points
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

    // Combat turn handling logic with multiple attacks
    const combatTurn = () => {
        if (monsters.length > 0) {
            let newCombatLog = [];
    
            // Player attacks the first monster in the list (if it exists)
            const firstMonster = monsters[0];
            const playerAttacks = calculateNumberOfAttacks(playerStats.speed);
    
            if (firstMonster) {
                for (let i = 0; i < playerAttacks; i++) {
                    const playerDamage = calculatePlayerDamage();
                    firstMonster.hp -= playerDamage;
    
                    newCombatLog.push({
                        message: `You hit the ${firstMonster.name} for ${playerDamage} damage! (Attack ${i + 1})`,
                        category: 'playerHit'
                    });
    
                    if (firstMonster.hp <= 0) {
                        newCombatLog.push({
                            message: `The ${firstMonster.name} has been slain!`,
                            category: 'monsterDeath'
                        });
                        newCombatLog.push({
                            message: `You gain ${firstMonster.exp} experience.`,
                            category: 'experience'
                        });
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
                        break; // Stop attacking if the monster is dead
                    }
                }
            }
    
            // Monsters attack the player
            monsters.forEach((monster) => {
                if (monster.hp > 0) {
                    const monsterAttacks = calculateNumberOfAttacks(monster.speed);
                    let totalMonsterDamage = 0;
    
                    for (let i = 0; i < monsterAttacks; i++) {
                        const monsterDamage = calculateMonsterDamage(monster);
                        totalMonsterDamage += monsterDamage;
    
                        newCombatLog.push({
                            message: `The ${monster.name} hits you for ${monsterDamage} damage! (Attack ${i + 1})`,
                            category: 'monsterHit'
                        });
    
                        if (playerStats.hp - totalMonsterDamage <= 0) {
                            newCombatLog.push({
                                message: 'You have been slain!',
                                category: 'playerDeath'
                            });
                            break; // Stop attacking if the player is dead
                        }
                    }
    
                    // Apply total damage from the monster after all attacks
                    setPlayerStats(prevStats => ({
                        ...prevStats,
                        hp: Math.max(prevStats.hp - totalMonsterDamage, 0) // Ensure HP doesn't go below 0
                    }));
                }
            });
    
            // Update combat log through context
            updateCombatLog(newCombatLog); // Use context function to update the combat log
        }
    };
    useEffect(() => {
        const gameLoopInterval = setInterval(() => {
            combatTurn(); // Call combat turn every tick
            passiveRegeneration(); // Regeneration every turn
        }, TICK_INTERVAL);

        return () => clearInterval(gameLoopInterval); // Cleanup on unmount
    }, [monsters, playerStats]); // Ensure to include necessary dependencies

    return {}; // No need to return combat log since it's managed in context now
};

export default useGameLoop;
