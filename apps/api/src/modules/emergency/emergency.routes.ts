import { Router } from "express";
export const emergencyRoutes = Router();

emergencyRoutes.post("/", async (req, res) => {
  // TODO: create emergency job + lock-on-accept flow later
  res.json({ ok: true, emergency: true, received: req.body });
});