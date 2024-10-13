import React from 'react';
import OutputWindow from './OutputWindow';
import Minimap from './Minimap';
import '../styles/App.css'; // Import your CSS styles
import Controls from './Controls';
import PlayerStats from './PlayerStats';

const GameLayout = () => {
    return (
        <div className="game-layout">
            <OutputWindow />
            <PlayerStats />
            <div>
                <Minimap />
                <div className="centered">
                <Controls />
                </div>
                
            </div>
            
        </div>
    );
};

export default GameLayout;
