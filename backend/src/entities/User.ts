// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column({ default: "user" }) // or 'admin'
  role!: string;

  @Column({ type: "bigint", default: 9000000 }) // 9,000,000
  budget!: number;
}
