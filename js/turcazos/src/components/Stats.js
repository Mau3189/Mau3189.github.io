import React from 'react';

const Stats = ({ players, decks, games }) => {
    // Stats calculation
    const calculatePlayerStats = () => {
        const stats = {};

        // Initialize stats for all players
        players.forEach(player => {
            stats[player] = { wins: 0, losses: 0, draws: 0, gamesPlayed: 0, winRate: 0 };
        });

        // Calculate stats from games
        games.forEach(game => {
            const participantIds = game.players.map(p => p.playerId);

            participantIds.forEach(playerId => {
                if (!stats[playerId]) return;

                stats[playerId].gamesPlayed++;

                if (game.isDraw) {
                    stats[playerId].draws++;
                } else if (game.winner === playerId) {
                    stats[playerId].wins++;
                } else {
                    stats[playerId].losses++;
                }
            });
        });

        // Calculate win rates
        Object.keys(stats).forEach(playerId => {
            const playerStats = stats[playerId];
            playerStats.winRate = playerStats.gamesPlayed > 0
                ? ((playerStats.wins / playerStats.gamesPlayed) * 100).toFixed(1)
                : 0;
        });

        return stats;
    };

    const calculateDeckStats = () => {
        const stats = {};

        // Initialize stats for all decks
        decks.forEach(deck => {
            stats[deck.id] = {
                name: deck.name,
                commander: deck.commander,
                owner: deck.owner,
                wins: 0,
                losses: 0,
                draws: 0,
                gamesPlayed: 0,
                winRate: 0
            };
        });

        // Calculate stats from games
        games.forEach(game => {
            game.players.forEach(participant => {
                const deckId = participant.deckId;
                if (!stats[deckId]) return;

                stats[deckId].gamesPlayed++;

                if (game.isDraw) {
                    stats[deckId].draws++;
                } else if (game.winner === participant.playerId) {
                    stats[deckId].wins++;
                } else {
                    stats[deckId].losses++;
                }
            });
        });

        // Calculate win rates
        Object.keys(stats).forEach(deckId => {
            const deckStats = stats[deckId];
            deckStats.winRate = deckStats.gamesPlayed > 0
                ? ((deckStats.wins / deckStats.gamesPlayed) * 100).toFixed(1)
                : 0;
        });

        return Object.values(stats);
    };

    const playerStats = calculatePlayerStats();
    const deckStats = calculateDeckStats();

    return (
        <div>
            <h2 className="text-xl font-semibold mb-3">Statistics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Player Stats */}
                <div className="bg-white shadow rounded p-4">
                    <h3 className="font-semibold mb-2">Player Statistics</h3>
                    {players.length === 0 ? (
                        <p className="text-gray-500">No players added yet</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-2 text-left">Player</th>
                                        <th className="p-2 text-center">Games</th>
                                        <th className="p-2 text-center">Wins</th>
                                        <th className="p-2 text-center">Losses</th>
                                        <th className="p-2 text-center">Draws</th>
                                        <th className="p-2 text-center">Win %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(playerStats)
                                        .sort((a, b) => b[1].winRate - a[1].winRate)
                                        .map(([player, stats]) => (
                                            <tr key={player} className="border-b">
                                                <td className="p-2">{player}</td>
                                                <td className="p-2 text-center">{stats.gamesPlayed}</td>
                                                <td className="p-2 text-center">{stats.wins}</td>
                                                <td className="p-2 text-center">{stats.losses}</td>
                                                <td className="p-2 text-center">{stats.draws}</td>
                                                <td className="p-2 text-center">{stats.winRate}%</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Deck Stats */}
                <div className="bg-white shadow rounded p-4">
                    <h3 className="font-semibold mb-2">Deck Statistics</h3>
                    {decks.length === 0 ? (
                        <p className="text-gray-500">No decks added yet</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-2 text-left">Deck</th>
                                        <th className="p-2 text-left">Commander</th>
                                        <th className="p-2 text-center">Games</th>
                                        <th className="p-2 text-center">Wins</th>
                                        <th className="p-2 text-center">Win %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {deckStats
                                        .sort((a, b) => b.winRate - a.winRate)
                                        .map((stats) => (
                                            <tr key={stats.name} className="border-b">
                                                <td className="p-2">{stats.name}</td>
                                                <td className="p-2">{stats.commander}</td>
                                                <td className="p-2 text-center">{stats.gamesPlayed}</td>
                                                <td className="p-2 text-center">{stats.wins}</td>
                                                <td className="p-2 text-center">{stats.winRate}%</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Stats;