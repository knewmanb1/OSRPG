import React from 'react';
import { useGameContext } from '../context/GameContext';
import rooms from '../data/rooms'; // Adjust the import based on where your rooms.js is located
import '../styles/App.css'; // Import your CSS file

const Minimap = () => {
    const { playerPos= { x: 0, y: 0, z: 0 } } = useGameContext(); // Get playerPosition from context

    const { x: playerX, y: playerY, z: playerZ } = playerPos; // Destructure position

    // Define the size of the grid
    const gridSize = 9; // 10x10 grid
    const roomSize = 20; // Size of each room square in pixels
    const halfGridSize = Math.floor(gridSize / 2); // 5

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
            });
        }
    }

    return (
        <div className="minimap-container">
            <h2>Minimap</h2>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridSize}, ${roomSize}px)`,
                    gridTemplateRows: `repeat(${gridSize}, ${roomSize}px)`,
                    gap: '2px', // Gap between grid cells
                }}
            >
                {roomsArray.map(({ x, y, room, exists }) => (
                    <div
                        key={`${x},${y},${playerZ}`} // Use playerZ for key
                        style={{
                            width: roomSize,
                            height: roomSize,
                            backgroundColor: exists
                                ? (x === playerX && y === playerY ? 'blue' : 'lightgrey') // Existing room
                                : 'white', // Non-existent room
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            border: 'none',
                        }}
                    >
                        {x === playerX && y === playerY && (
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontWeight: 'bold',
                                color: 'white',
                            }}>
                                {/* Optional: Character or marker to show player position */}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Minimap;
