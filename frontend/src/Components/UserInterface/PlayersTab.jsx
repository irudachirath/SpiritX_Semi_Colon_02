import React from 'react';

const PlayersTab = ({ players }) => {
  return (
    <div className="players-tab">
      <h2>Players</h2>
      <div className="players-grid">
        {players.map((player) => (
          <div key={player.id} className="player-card">
            <h3>{player.name}</h3>
            <p>{player.university}</p>
            <p>{player.role}</p>
            <button>View Stats</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersTab;