import React from 'react';

const PlayersView = ({ players }) => {
  return (
    <div className="players-view">
      <h2>Players</h2>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>University</th>
              <th>Role</th>
              <th>Batting Stats</th>
              <th>Bowling Stats</th>
              <th>Points</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id}>
                <td>{player.name}</td>
                <td>{player.university}</td>
                <td>{player.role}</td>
                <td>{player.battingStats}</td>
                <td>{player.bowlingStats}</td>
                <td>{player.points}</td>
                <td>{player.value}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayersView;