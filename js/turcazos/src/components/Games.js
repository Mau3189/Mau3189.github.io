import React, { useState } from 'react';

const Games = ({ games, setGames, players, decks }) => {
    const [gameData, setGameData] = useState({
        date: new Date().toISOString().substr(0, 10),
        players: [],
        winner: '',
        isDraw: false,
    });

    const updateGamePlayer = (index, playerId, deckId) => {
        const updatedPlayers = [...gameData.players];
        updatedPlayers[index] = { playerId, deckId };
        setGameData({ ...gameData, players: updatedPlayers });
    };

    const addGamePlayer = () => {
        setGameData({
            ...gameData,
            players: [...gameData.players, { playerId: '', deckId: '' }]
        });
    };

    const removeGamePlayer = (index) => {
        const updatedPlayers = gameData.players.filter((_, i) => i !== index);
        setGameData({ ...gameData, players: updatedPlayers });
    };

    const saveGame = () => {
        // Validate game data
        if (
            gameData.date &&
            gameData.players.length >= 2 &&
            gameData.players.every(p => p.playerId && p.deckId) &&
            (gameData.isDraw || gameData.winner)
        ) {
            const newGame = {
                ...gameData,
                id: Date.now(),
                date: gameData.date
            };
            setGames([...games, newGame]);

            // Reset game form
            setGameData({
                date: new Date().toISOString().substr(0, 10),
                players: [],
                winner: '',
                isDraw: false,
            });
        } else {
            alert('Please fill in all game details');
        }
    };

    const removeGame = (gameId) => {
        setGames(games.filter(game => game.id !== gameId));
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-3">Record Game</h2>

            <div className="mb-4">
                <label className="block mb-1">Date</label>
                <input
                    type="date"
                    value={gameData.date}
                    onChange={(e) => setGameData({ ...gameData, date: e.target.value })}
                    className="p-2 border rounded w-full"
                />
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <label className="font-semibold">Players & Decks</label>
                    <button
                        onClick={addGamePlayer}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                    >
                        Add Player
                    </button>
                </div>

                {gameData.players.map((player, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                        <select
                            value={player.playerId}
                            onChange={(e) => updateGamePlayer(index, e.target.value, player.deckId)}
                            className="p-2 border rounded"
                        >
                            <option value="">Select Player</option>
                            {players.map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>

                        <select
                            value={player.deckId}
                            onChange={(e) => updateGamePlayer(index, player.playerId, e.target.value)}
                            className="p-2 border rounded"
                        >
                            <option value="">Select Deck</option>
                            {decks.filter(d => !gameData.players.some(p => p !== player && p.deckId === d.id.toString()))
                                .map(deck => (
                                    <option key={deck.id} value={deck.id}>
                                        {deck.name} ({deck.commander})
                                    </option>
                                ))}
                        </select>

                        <button
                            onClick={() => removeGamePlayer(index)}
                            className="text-red-500 text-sm"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                {gameData.players.length === 0 && (
                    <button
                        onClick={addGamePlayer}
                        className="bg-gray-200 w-full p-2 rounded mb-4"
                    >
                        Add First Player
                    </button>
                )}
            </div>

            <div className="mb-4">
                <div className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        checked={gameData.isDraw}
                        onChange={(e) => setGameData({ ...gameData, isDraw: e.target.checked, winner: e.target.checked ? '' : gameData.winner })}
                        className="mr-2"
                        id="isDraw"
                    />
                    <label htmlFor="isDraw">Game ended in a draw</label>
                </div>

                {!gameData.isDraw && (
                    <div>
                        <label className="block mb-1">Winner</label>
                        <select
                            value={gameData.winner}
                            onChange={(e) => setGameData({ ...gameData, winner: e.target.value })}
                            className="p-2 border rounded w-full"
                            disabled={gameData.isDraw}
                        >
                            <option value="">Select Winner</option>
                            {gameData.players.filter(p => p.playerId).map((player, index) => (
                                <option key={index} value={player.playerId}>
                                    {player.playerId} - {decks.find(d => d.id.toString() === player.deckId)?.name || ''}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <button
                onClick={saveGame}
                className="bg-green-500 text-white px-4 py-2 rounded w-full"
            >
                Save Game
            </button>

            <div className="mt-8 bg-white shadow rounded p-4">
                <h3 className="font-semibold mb-2">Game History</h3>
                {games.length === 0 ? (
                    <p className="text-gray-500">No games recorded yet</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 text-left">Date</th>
                                    <th className="p-2 text-left">Players</th>
                                    <th className="p-2 text-left">Result</th>
                                    <th className="p-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {games.map(game => (
                                    <tr key={game.id} className="border-b">
                                        <td className="p-2">{new Date(game.date).toLocaleDateString()}</td>
                                        <td className="p-2">
                                            {game.players.map((player, i) => {
                                                const deck = decks.find(d => d.id.toString() === player.deckId);
                                                return (
                                                    <div key={i}>
                                                        {player.playerId} ({deck?.name || 'Unknown Deck'})
                                                    </div>
                                                );
                                            })}
                                        </td>
                                        <td className="p-2">
                                            {game.isDraw ? 'Draw' : `Winner: ${game.winner}`}
                                        </td>
                                        <td className="p-2">
                                            <button
                                                onClick={() => removeGame(game.id)}
                                                className="text-red-500"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Games;