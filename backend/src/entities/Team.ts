// src/entities/Team.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { TeamPlayers } from "./TeamPlayers";

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  teamName!: string;

  @ManyToOne(() => User)
  owner!: User;

  // relation to team_players
  @OneToMany(() => TeamPlayers, (tp) => tp.team)
  teamPlayers!: TeamPlayers[];
}
