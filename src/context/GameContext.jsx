import React, { createContext, useState, useContext } from 'react';
import rooms from '../data/rooms'; // Adjust the path as necessary
import { movePlayer, spawnMonsters } from '../utils/gameLogic';
import player from '../data/player';

const GameContext = createContext();

const GameProvider = ({ children }) => {
    const [playerPos, setPlayerPos] = useState({ x: 0, y: 0, z: 0 });
    const [currentRoom, setCurrentRoom] = useState(rooms[`${playerPos.x},${playerPos.y},${playerPos.z}`]);
    const [monsters, setMonsters] = useState([]);

    const [playerStats, setPlayerStats] = useState({
        hp: player.hp,
        mp: player.mp,
        hpMax: player.hpMax,
        mpMax: player.mpMax,
        con: player.con,
        str: player.str,
        dex: player.dex,
        int: player.int,
        wis: player.wis,
        per: player.per,
        speed: player.speed,
        level: 1,
        experience: 100,
        expToNextLevel: 100,
        pointsToSpend: 10
    });

    // Function to update the room and manage monsters
    const updateRoom = (newPosition) => {
        const roomKey = `${newPosition.x},${newPosition.y},${newPosition.z}`;
        const newRoom = rooms[roomKey];
    
        // Update the current room and mark it as discovered
        setCurrentRoom((prevRoom) => ({
            ...prevRoom,
            discovered: true, // Mark the room as discovered
        }));
    
        if (!newRoom.discovered) {
            newRoom.discovered = true; // Mark as discovered in the room data
        }
    
        // Continue with existing monster logic
        if (newRoom.monsters && newRoom.monsters.length > 0) {
            setMonsters(newRoom.monsters); // Load existing monsters
        } else {
            const spawnedMonsters = spawnMonsters(roomKey);
            setMonsters(spawnedMonsters);
            newRoom.monsters = spawnedMonsters; // Save new monsters in room object
        }
    };
    

    // Function to handle player movement
    const move = (direction) => {
        // Move the player and get the new position
        const newPosition = movePlayer(direction, playerPos);
        setPlayerPos(newPosition); // Update the player's position

        // Update the room based on the new position
        updateRoom(newPosition);
    };
    const rest = () => {
        if (monsters.length === 0) { // Ensure no monsters in the room
            const regenAmountHP = Math.min(playerStats.hpMax - playerStats.hp, 20); // Restores up to 20 HP
            const regenAmountMP = Math.min(playerStats.mpMax - playerStats.mp, 10); // Restores up to 10 MP
            
            setPlayerStats(prevStats => ({
                ...prevStats,
                hp: prevStats.hp + regenAmountHP,
                mp: prevStats.mp + regenAmountMP,
            }));
            
            console.log(`You rest and recover ${regenAmountHP} health and ${regenAmountMP} mana.`);
        } else {
            console.log("You cannot rest with monsters nearby.");
        }
    };
    const calculateMaxHP = (con) => {
        return 10; // Example: 10 base HP + 5 per Constitution point
    };
    
    const calculateMaxMP = (wis) => {
        return 3; // Example: 5 base MP + 3 per Wisdom point
    };
    const spendPoints = (stat, points) => {
        setPlayerStats((prevStats) => {
            const updatedStatValue = prevStats[stat] + 1;
            let newHP = prevStats.hpMax;
            let newMP = prevStats.mpMax;
    
            // Recalculate HP and MP based on Constitution and Wisdom, or other attributes
            if (stat === 'con') {
                newHP = prevStats.hpMax + calculateMaxHP(updatedStatValue); // Modify to suit your HP formula
            } else if (stat === 'wis') {
                newMP = prevStats.mpMax + calculateMaxMP(updatedStatValue); // Modify to suit your MP formula
            }
    
            return {
                ...prevStats,
                [stat]: updatedStatValue,
                hpMax: newHP,
                hp: Math.min(newHP, prevStats.hp), // Adjust current HP
                mpMax: newMP,
                mp: Math.min(newMP, prevStats.mp), // Adjust current MP
                pointsToSpend: prevStats.pointsToSpend - points,
            };
        });
    };

    // Function to update the monsters both in the room and in state
    const updateMonstersInRoom = (updatedMonsters) => {
        // Update the monsters in the current room
        const roomKey = `${playerPos.x},${playerPos.y},${playerPos.z}`;
        rooms[roomKey].monsters = updatedMonsters; // Update the room's monster list
        setMonsters(updatedMonsters); // Update the state
    };

    const [combatLog, setCombatLog] = useState([])
    const updateCombatLog = (newLog) => {
        setCombatLog(prevLog => [...prevLog, ...newLog]);
    };
    return (
        <GameContext.Provider 
            value={{ 
                playerPos, 
                setPlayerPos, 
                currentRoom, 
                monsters, 
                setMonsters, 
                move, 
                setCurrentRoom, 
                playerStats, 
                setPlayerStats,
                updateMonstersInRoom,
                rest,
                spendPoints, // Provide function to update monsters
                combatLog,
                updateCombatLog
            }}>
            {children}
        </GameContext.Provider>
    );
};

// Custom hook for easier access to context
const useGameContext = () => useContext(GameContext);

export { GameProvider, useGameContext };
