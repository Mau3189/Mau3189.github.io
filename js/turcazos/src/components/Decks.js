import React, { useState } from 'react';

const Decks = ({ decks, setDecks, players }) => {
    const [newDeck, setNewDeck] = useState({ name: '', commander: '', owner: '' });

    const addDeck = () => {
        if (newDeck.name.trim() && newDeck.commander.trim() && newDeck.owner.trim()) {
            setDecks([...decks, { ...newDeck, id: Date.now() }]);
            setNewDeck({ name: '', commander: '', owner: '' });
        }
    };

    const removeDeck = (deckId) => {
        setDecks(decks.filter(deck => deck.id !== deckId));
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-3">Manage Decks</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                    type="text"
                    value={newDeck.name}
                    onChange={(e) => setNewDeck({ ...newDeck, name: e.target.value })}
                    placeholder="Deck Name"
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    value={newDeck.commander}
                    onChange={(e) => setNewDeck({ ...newDeck, commander: e.target.value })}
                    placeholder="Commander"
                    className="p-2 border rounded"
                />
                <select
                    value={newDeck.owner}
                    onChange={(e) => setNewDeck({ ...newDeck, owner: e.target.value })}
                    className="p-2 border rounded"
                >
                    <option value="">Select Owner</option>
                    {players.map(player => (
                        <option key={player} value={player}>{player}</option>
                    ))}
                </select>
            </div>

            <button
                onClick={addDeck}
                className="bg-green-500 text-white px-4 py-2 rounded mb-4 w-full"
            >
                Add Deck
            </button>

            <div className="bg-white shadow rounded p-4">
                <h3 className="font-semibold mb-2">Deck List</h3>
                {decks.length === 0 ? (
                    <p className="text-gray-500">No decks added yet</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 text-left">Deck Name</th>
                                    <th className="p-2 text-left">Commander</th>
                                    <th className="p-2 text-left">Owner</th>
                                    <th className="p-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {decks.map(deck => (
                                    <tr key={deck.id} className="border-b">
                                        <td className="p-2">{deck.name}</td>
                                        <td className="p-2">{deck.commander}</td>
                                        <td className="p-2">{deck.owner}</td>
                                        <td className="p-2">
                                            <button
                                                onClick={() => removeDeck(deck.id)}
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

export default Decks;