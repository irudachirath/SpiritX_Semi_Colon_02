// src/index.ts
import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";

const app = express();
app.use(cors());
app.use(express.json());

// -- Import routes (we'll define these soon)
import userRoutes from "./routes/userRoutes";
import playerRoutes from "./routes/playerRoutes";
import teamRoutes from "./routes/teamRoutes";
// etc.

// -- Use the routes
app.use("/api/users", userRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/teams", teamRoutes);
// etc.

// -- Start server once DB connection is established
AppDataSource.initialize()
  .then(() => {
    app.listen(4000, () => {
      console.log("Server started on http://localhost:4000");
    });
  })
  .catch((error) => console.log(error));
