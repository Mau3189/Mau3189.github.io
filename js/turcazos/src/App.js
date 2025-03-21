import React, { useState, useEffect } from 'react';
import './App.css';
import Players from './components/Players';
import Decks from './components/Decks';
import Games from './components/Games';
import Stats from './components/Stats';

function App() {
    // State management
    const [players, setPlayers] = useState([]);
    const [decks, setDecks] = useState([]);
    const [games, setGames] = useState([]);
    const [activeTab, setActiveTab] = useState('players');

    // Load data from localStorage on component mount
    useEffect(() => {
        const storedPlayers = localStorage.getItem('mtgPlayers');
        const storedDecks = localStorage.getItem('mtgDecks');
        const storedGames = localStorage.getItem('mtgGames');

        if (storedPlayers) setPlayers(JSON.parse(storedPlayers));
        if (storedDecks) setDecks(JSON.parse(storedDecks));
        if (storedGames) setGames(JSON.parse(storedGames));
    }, []);

    // Save data to localStorage when state changes
    useEffect(() => {
        localStorage.setItem('mtgPlayers', JSON.stringify(players));
        localStorage.setItem('mtgDecks', JSON.stringify(decks));
        localStorage.setItem('mtgGames', JSON.stringify(games));
    }, [players, decks, games]);

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">MTG Commander Tracker</h1>

            {/* Navigation */}
            <div className="flex border-b mb-4">
                <button
                    onClick={() => setActiveTab('players')}
                    className={`px-4 py-2 ${activeTab === 'players' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Players
                </button>
                <button
                    onClick={() => setActiveTab('decks')}
                    className={`px-4 py-2 ${activeTab === 'decks' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Decks
                </button>
                <button
                    onClick={() => setActiveTab('games')}
                    className={`px-4 py-2 ${activeTab === 'games' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Record Game
                </button>
                <button
                    onClick={() => setActiveTab('stats')}
                    className={`px-4 py-2 ${activeTab === 'stats' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Statistics
                </button>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'players' && (
                <Players
                    players={players}
                    setPlayers={setPlayers}
                />
            )}

            {activeTab === 'decks' && (
                <Decks
                    decks={decks}
                    setDecks={setDecks}
                    players={players}
                />
            )}

            {activeTab === 'games' && (
                <Games
                    games={games}
                    setGames={setGames}
                    players={players}
                    decks={decks}
                />
            )}

            {activeTab === 'stats' && (
                <Stats
                    players={players}
                    decks={decks}
                    games={games}
                />
            )}
        </div>
    );
}

export default App;