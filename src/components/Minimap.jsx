import React from 'react';
import { useGameContext } from '../context/GameContext';
import rooms from '../data/rooms'; // Adjust the import based on where your rooms.js is located
import '../styles/App.css'; // Import your CSS file

const Minimap = () => {
    const { playerPos= { x: 0, y: 0, z: 0 } } = useGameContext(); // Get playerPosition from context
    const { x: playerX, y: playerY, z: playerZ } = playerPos; // Destructure position

    // Define the size of the grid
    const gridSize = 9; // 9x9 grid
    const halfGridSize = Math.floor(gridSize / 2); // 4

    // Determine the bounds of the grid
    const startX = playerX - halfGridSize;
    const startY = playerY - halfGridSize;
    const roomsArray = [];

    // Fill the rooms array with the correct data for the grid
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const roomKey = `${startX + x},${startY + y},${playerZ}`; // Use playerZ for z-coordinate
            const room = rooms[roomKey]; // Get the room from the map
            roomsArray.push({
                x: startX + x,
                y: startY + y,
                room,
                exists: room !== undefined, // Check if the room exists
                exits: room?.exits || [] // Add exits for the room
            });
        }
    }

    return (
        <div className="minimap-container">
            <h2>Minimap</h2>
            <div className="minimap-grid">
                {roomsArray.map(({ x, y, room, exists, exits }) => (
                    <div
                        key={`${x},${y},${playerZ}`} // Use playerZ for key
                        className={`minimap-room ${exists ? 'exists' : 'non-exists'} ${x === playerX && y === playerY ? 'player-room' : ''}`}
                    >
                        {/* Optional: Display room exits */}
                        {exists && exits.map((exit, index) => (
                            <div key={index} className={`exit ${exit.toLowerCase()}`}></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Minimap;
