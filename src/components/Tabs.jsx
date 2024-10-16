import React, { useState } from 'react';
import Minimap from './Minimap'; // Ensure Minimap is correctly imported
import '../styles/App.css';
import PlayerStats from './PlayerStats';
import OutputWindow from './OutputWindow';
import Controls from './Controls';

const TabbedInterface = () => {
    const [activeTab, setActiveTab] = useState('stats'); // Default to stats tab

    const renderContent = () => {
        switch (activeTab) {
            case 'stats':
                return <Stats />;
            case 'inventory':
                return <Inventory />;
            case 'combatLog':
                return <CombatLog />;
            default:
                return <Stats />;
        }
    };

    return (
        <div className="tabbed-layout">
            {/* Tabs Section */}
            <div className="tabs">
                <button onClick={() => setActiveTab('stats')} className={activeTab === 'stats' ? 'active' : ''}>
                    Stats
                </button>
                <button onClick={() => setActiveTab('inventory')} className={activeTab === 'inventory' ? 'active' : ''}>
                    Inventory
                </button>
                <button onClick={() => setActiveTab('combatLog')} className={activeTab === 'combatLog' ? 'active' : ''}>
                    Combat Log
                </button>
            </div>

            {/* Main Content Section */}
            <div className="content-area">
                {renderContent()}
            </div>

            {/* Minimap Section */}
            <div className="minimap-container">
                <Minimap /> {/* Make sure Minimap component renders here */}
                <Controls /> {/* Controls should be rendered under Minimap */}
            </div>
        </div>
    );
};

// Example components for each tab content
const Stats = () => (
    <div>
        <h3>Player Stats</h3>
        <PlayerStats />
    </div>
);

const Inventory = () => (
    <div>
        <h3>Inventory</h3>
        <p>Show your inventory items here...</p>
    </div>
);

// Combat Log Component
const CombatLog = () => (
    <div>
        <h3>Combat Log</h3>
        <OutputWindow />
    </div>
);

export default TabbedInterface;
