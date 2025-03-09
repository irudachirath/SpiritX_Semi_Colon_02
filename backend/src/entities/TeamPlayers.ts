// src/entities/TeamPlayers.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Player } from "./Player";
import { Team } from "./Team";

@Entity()
export class TeamPlayers {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Team, (team) => team.teamPlayers)
  team!: Team;

  @ManyToOne(() => Player)
  player!: Player;
}
