import React, { useState } from 'react';

const SelectTeamTab = ({ players, onAddToTeam }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="select-team-tab">
      <h2>Select Your Team</h2>
      <div className="category-buttons">
        <button onClick={() => setSelectedCategory('All')}>All</button>
        <button onClick={() => setSelectedCategory('Batsman')}>Batsman</button>
        <button onClick={() => setSelectedCategory('Bowler')}>Bowler</button>
        <button onClick={() => setSelectedCategory('All-Rounder')}>All-Rounder</button>
      </div>
      <div className="players-list">
        {players
          .filter((player) => selectedCategory === 'All' || player.role === selectedCategory)
          .map((player) => (
            <div key={player.id} className="player-item">
              <h3>{player.name}</h3>
              <p>{player.university}</p>
              <button onClick={() => onAddToTeam(player)}>Add to Team</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SelectTeamTab;