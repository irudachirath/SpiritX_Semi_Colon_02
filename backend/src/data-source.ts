// src/data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Player } from "./entities/Player";
import { PlayerStats } from "./entities/PlayerStats";
import { Team } from "./entities/Team";
import { TeamPlayers } from "./entities/TeamPlayers";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "SQL_Cmac@0909",
  database: "spirit11_db",
  synchronize: false, // or true for development only
  logging: false,
  entities: [User, Player, PlayerStats, Team, TeamPlayers],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
});
