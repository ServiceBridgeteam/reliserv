import { Router } from "express";
export const authRoutes = Router();

authRoutes.post("/login", async (_req, res) => res.json({ token: "dev-token" }));
authRoutes.post("/signup", async (_req, res) => res.json({ ok: true }));