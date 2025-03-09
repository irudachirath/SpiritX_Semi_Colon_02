// src/entities/PlayerStats.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Player } from "./Player";

@Entity()
export class PlayerStats {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Player)
  @JoinColumn() // this will create a playerId FK
  player!: Player;

  @Column({ default: 0 })
  matchesPlayed!: number;

  @Column({ default: 0 })
  inningsPlayed!: number;

  @Column({ default: 0 })
  totalRuns!: number;

  @Column({ default: 0 })
  totalBallsFaced!: number;

  @Column({ default: 0 })
  totalBallsBowled!: number;

  @Column({ default: 0 })
  totalRunsConceded!: number;

  @Column({ default: 0 })
  totalWicketsTaken!: number;
}
