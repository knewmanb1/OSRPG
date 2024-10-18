import React from "react";
import { useGameContext } from "../context/GameContext";
import "../styles/App.css"; // Import your CSS styles
import CombatWindow from "./CombatWindow";

const OutputWindow = () => {
  const { currentRoom, monsters = [] } = useGameContext(); // Default to an empty array
  return (
    <div className="output-window">
      {currentRoom && (
        <div className="room-info">
          <h2>{currentRoom.name}</h2>
          <p>{currentRoom.description}</p>
          <p>
            <strong>Exits: </strong>
            {Array.isArray(currentRoom.exits) && currentRoom.exits.length > 0
              ? currentRoom.exits.join(", ")
              : "None"}
          </p>
          {monsters.length > 0 ? (
            <div>
              <strong>Also Here: </strong>
              {monsters.map((monster) => monster.name).join(", ")}
            </div>
          ) : (
            <p>
              <strong>Also Here: </strong>No one
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default OutputWindow;
