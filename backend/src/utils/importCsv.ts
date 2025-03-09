// src/utils/importCsv.ts
import fs from "fs";
import Papa from "papaparse";
import { AppDataSource } from "../data-source";
import { Player } from "../entities/Player";
import { PlayerStats } from "../entities/PlayerStats";

function roundToNearest(value: number, multiple: number): number {
  return Math.round(value / multiple) * multiple;
}

function calculatePlayerPoints(
  runs: number,
  ballsFaced: number,
  innings: number,
  ballsBowled: number,
  runsConceded: number,
  wickets: number
): number {
  const battingSR = ballsFaced > 0 ? (runs / ballsFaced) * 100 : 0;
  const battingAvg = innings > 0 ? runs / innings : 0;
  const bowlingSR = wickets > 0 ? ballsBowled / wickets : 0;
  const economy = ballsBowled > 0 ? (runsConceded / ballsBowled) * 6 : 0;

  const battingComponent = battingSR * 0.2 + battingAvg * 0.8;
  const bowlingComponent =
    bowlingSR > 0 && economy > 0 ? 500 / bowlingSR + 140 / economy : 0;

  return battingComponent + bowlingComponent;
}

function calculatePlayerValue(points: number): number {
  let value = (9 * points + 100) * 1000;
  return roundToNearest(value, 50000);
}

export async function importCsvData(filePath: string) {
  const file = fs.readFileSync(filePath, "utf8");
  const { data } = Papa.parse(file, { header: true });

  data.map(async (row: any) => {
    try {
      // Suppose your CSV columns are named:
      // fullName, university, matchesPlayed, inningsPlayed, totalRuns, totalBallsFaced,
      // totalBallsBowled, totalRunsConceded, totalWicketsTaken
      const fullName = row["fullName"];
      const university = row["university"];
      const matchesPlayed = Number(row["matchesPlayed"]);
      const inningsPlayed = Number(row["inningsPlayed"]);
      const totalRuns = Number(row["totalRuns"]);
      const totalBallsFaced = Number(row["totalBallsFaced"]);
      const totalBallsBowled = Number(row["totalBallsBowled"]);
      const totalRunsConceded = Number(row["totalRunsConceded"]);
      const totalWicketsTaken = Number(row["totalWicketsTaken"]);

      // Calculate points & value
      const playerPoints = calculatePlayerPoints(
        totalRuns,
        totalBallsFaced,
        inningsPlayed,
        totalBallsBowled,
        totalRunsConceded,
        totalWicketsTaken
      );
      const playerValue = calculatePlayerValue(playerPoints);

      // Create new Player
      const playerRepo = AppDataSource.getRepository(Player);
      let player = new Player();
      player.fullName = fullName;
      player.university = university;
      player.playerPoints = Number(playerPoints.toFixed(2));
      player.playerValue = playerValue;

      // Save Player
      player = await playerRepo.save(player);

      // Create PlayerStats
      const statsRepo = AppDataSource.getRepository(PlayerStats);
      let stats = new PlayerStats();
      stats.player = player;
      stats.matchesPlayed = matchesPlayed;
      stats.inningsPlayed = inningsPlayed;
      stats.totalRuns = totalRuns;
      stats.totalBallsFaced = totalBallsFaced;
      stats.totalBallsBowled = totalBallsBowled;
      stats.totalRunsConceded = totalRunsConceded;
      stats.totalWicketsTaken = totalWicketsTaken;
      await statsRepo.save(stats);
    } catch (err) {
      console.error("Error processing row:", row, err);
    }
  });
}
