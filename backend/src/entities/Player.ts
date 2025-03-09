import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { PlayerStats } from "./PlayerStats";

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullName!: string;

  @Column()
  university!: string;

  // final computed points
  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  playerPoints!: number;

  // final computed value in rupees
  @Column("bigint", { default: 0 })
  playerValue!: number;
}
