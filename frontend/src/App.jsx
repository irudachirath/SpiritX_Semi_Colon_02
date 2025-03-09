import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PlayersView from './Components/AdminPanel/PlayersView';
import PlayerStatsView from './Components/AdminPanel/PlayerStatsView';
import TournamentSummary from './Components/AdminPanel/TournamentSummary';
import AuthPages from './Components/UserInterface/AuthPages';
import PlayersTab from './Components/UserInterface/PlayersTab';
import SelectTeamTab from './Components/UserInterface/SelectTeamTab';
import Spiriter from './Components/Chatbot/Spiriter';
import './App.css';

const App = () => {
  const players = [
    { id: 1, name: 'Danushka Kumara', university: 'UoM', role: 'Batsman', battingStats: '50.2', bowlingStats: 'N/A', points: 120, value: 1200000 },
  ];

  return (
    <Router>
      <div className="app">
        <h1>SpiritII Fantasy Cricket</h1>
        <nav>
          <Link to="/admin">Admin Panel</Link>
          <Link to="/user">User Interface</Link>
          <Link to="/chatbot">Spiriter Chatbot</Link>
        </nav>

        <Routes>
          <Route path="/admin" element={
            <>
              <PlayersView players={players} />
              <PlayerStatsView player={players[0]} />
              <TournamentSummary summary={{ totalRuns: 5000, totalWickets: 200, highestRunScorer: 'Danushka Kumara', highestWicketTaker: 'Jeewan Thirimanne' }} />
            </>
          } />
          <Route path="/user" element={
            <>
              <AuthPages />
              <PlayersTab players={players} />
              <SelectTeamTab players={players} onAddToTeam={(player) => console.log('Added:', player)} />
            </>
          } />
          <Route path="/chatbot" element={<Spiriter />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;