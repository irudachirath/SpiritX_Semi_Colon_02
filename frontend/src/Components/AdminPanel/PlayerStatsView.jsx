import React from 'react';

const PlayerStatsView = ({ player }) => {
  return (
    <div className="player-stats-view">
      <h2>{player.name}'s Stats</h2>
      <div className="stats-grid">
        <div>Batting Average: {player.battingAverage}</div>
        <div>Strike Rate: {player.strikeRate}</div>
        <div>Bowling Economy: {player.economy}</div>
        <div>Wickets: {player.wickets}</div>
      </div>
    </div>
  );
};

export default PlayerStatsView;