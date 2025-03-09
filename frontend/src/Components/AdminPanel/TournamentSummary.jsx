import React from 'react';

const TournamentSummary = ({ summary }) => {
  return (
    <div className="tournament-summary">
      <h2>Tournament Summary</h2>
      <div className="summary-grid">
        <div>Total Runs: {summary.totalRuns}</div>
        <div>Total Wickets: {summary.totalWickets}</div>
        <div>Highest Run Scorer: {summary.highestRunScorer}</div>
        <div>Highest Wicket Taker: {summary.highestWicketTaker}</div>
      </div>
    </div>
  );
};

export default TournamentSummary;