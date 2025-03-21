import React, { useState } from 'react';

const Players = ({ players, setPlayers }) => {
  const [newPlayer, setNewPlayer] = useState('');

  const addPlayer = () => {
    if (newPlayer.trim() && !players.includes(newPlayer.trim())) {
      setPlayers([...players, newPlayer.trim()]);
      setNewPlayer('');
    }
  };

  const removePlayer = (playerToRemove) => {
    setPlayers(players.filter(player => player !== playerToRemove));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Manage Players</h2>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          placeholder="Player Name"
          className="flex-grow p-2 border rounded mr-2"
        />
        <button 
          onClick={addPlayer}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Player
        </button>
      </div>
      
      <div className="bg-white shadow rounded p-4">
        <h3 className="font-semibold mb-2">Player List</h3>
        {players.length === 0 ? (
          <p className="text-gray-500">No players added yet</p>
        ) : (
          <ul>
            {players.map(player => (
              <li key={player} className="flex justify-between items-center py-2 border-b">
                {player}
                <button 
                  onClick={() => removePlayer(player)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Players;