import rooms from '../data/rooms'; // Import your rooms
import monsters from '../data/monsters';
// Player's initial position
let playerPosition = { x: 0, y: 0, z: 0 };

// Function to move the player
// Example of the movePlayer function
const movePlayer = (direction, playerPos) => {
    const currentRoomKey = `${playerPos.x},${playerPos.y},${playerPos.z}`;
    const currentRoom = rooms[currentRoomKey];
    const newPos = { ...playerPos };

    // Check if the current room allows movement in the desired direction
    if (!currentRoom.exits.includes(direction)) {
        console.log(`You cannot move ${direction} from here.`);
        return playerPos; // Return original position if movement is not allowed
    }
    switch (direction) {
        case 'Northwest':
            newPos.x -= 1;
            newPos.y -= 1;
            break;
        case 'North':
            newPos.y -= 1;
            break;
        case 'Northeast':
            newPos.x += 1;
            newPos.y -= 1;
            break;
        case 'West':
            newPos.x -= 1;
            break;
        case 'East':
            newPos.x += 1;
            break;
        case 'Southwest':
            newPos.x -= 1;
            newPos.y += 1;
            break;
        case 'South':
            newPos.y += 1;
            break;
        case 'Southeast':
            newPos.x += 1;
            newPos.y += 1;
            break;
        case 'Up':
            newPos.z += 1;
            break;
        case 'Down':
            newPos.z -= 1;
            break;
        default:
            break;
    }
    // Check if the new room exists
    const roomKey = `${newPos.x},${newPos.y},${newPos.z}`;
    const roomExists = rooms[roomKey] !== undefined;

    if (roomExists) {
        return newPos; // Return new position if room exists
    } else {
        console.log('Room does not exist. You cannot move there.');
        return playerPos; // Return original position if room doesn't exist
    }
};



// Function to spawn monsters based on room properties
const spawnMonsters = (roomKey) => {
    const room = rooms[roomKey];
    if (!room || !room.area) return []; // Return empty if no area defined

    const spawnChance = room.spawnChance || 0;
    const roll = Math.random();
    if (roll > spawnChance) return []; // No monsters spawned

    const spawnMin = room.spawnMin || 0;
    const spawnMax = room.spawnMax || 1;
    const monsterCount = Math.floor(Math.random() * (spawnMax - spawnMin + 1)) + spawnMin;

    const areaMonsters = monsters[room.area];
    if (!areaMonsters || !Array.isArray(areaMonsters)) {
        console.error(`No monsters defined for area: ${room.area}`);
        return []; // Return empty array if no monsters defined for area
    }

    const spawnedMonsters = [];
    for (let i = 0; i < monsterCount; i++) {
        const randomMonster = areaMonsters[Math.floor(Math.random() * areaMonsters.length)];
        const monster = {
            ...randomMonster,
            hp: Math.floor(Math.random() * (randomMonster.hp.max - randomMonster.hp.min + 1)) + randomMonster.hp.min
        };
        spawnedMonsters.push(monster);
        room.monsters.push(monster); // Add monster to the room's monster list
    }

    return spawnedMonsters;
};



// Example combat function
const initiateCombat = (monster) => {
    // Logic for combat, health calculations, etc.
    console.log(`Combat initiated with ${monster.name}`);
};

// Export functions
export { playerPosition, movePlayer, spawnMonsters, initiateCombat };
