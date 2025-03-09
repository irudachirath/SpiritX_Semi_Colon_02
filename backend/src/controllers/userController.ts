// src/controllers/userController.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export async function register(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;

    const userRepo = AppDataSource.getRepository(User);

    // check duplicates
    const existingUser = await userRepo.findOne({
      where: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User/Email already exists" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = userRepo.create({
      username,
      email,
      passwordHash,
      budget: 9000000, // default budget
    });
    await userRepo.save(newUser);

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Generate JWT
    const token = jwt.sign({ userId: user.id, role: user.role }, "SECRET_KEY", {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
