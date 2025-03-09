// src/controllers/playerController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Player } from "../entities/Player";
import { PlayerStats } from "../entities/PlayerStats";

export async function getAllPlayers(req: Request, res: Response) {
  try {
    const playerRepo = AppDataSource.getRepository(Player);
    // If you want to load related stats automatically, you can also use relations or join
    // e.g. { relations: ["playerStats"] } if you define the relationship that way
    const players = await playerRepo.find();

    return res.json(players);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function getPlayerById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const playerRepo = AppDataSource.getRepository(Player);
    const statsRepo = AppDataSource.getRepository(PlayerStats);

    // In TypeORM 0.3+, use an object with { where: ... }:
    const player = await playerRepo.findOne({
      where: { id: Number(id) },
    });

    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    // Find the stats row for this player
    const stats = await statsRepo.findOne({
      where: { player: { id: player.id } },
    });

    // Return combined data (player + stats)
    return res.json({ ...player, stats });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
