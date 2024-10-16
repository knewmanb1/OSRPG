import React from 'react';
import Minimap from './Minimap';
import '../styles/App.css'; // Import your CSS styles
import Controls from './Controls';

const GameLayout = () => {
    return (
        <div className="game-layout">
            <div>
                <Minimap />
                <div className="centered">
                </div>
                
            </div>
            
        </div>
    );
};

export default GameLayout;
