import { Router } from "express";
export const jobsRoutes = Router();

jobsRoutes.post("/", async (req, res) => {
  // TODO: create job + AI clarify stub
  res.json({ ok: true, received: req.body });
});

jobsRoutes.get("/:id", async (req, res) => {
  res.json({ id: req.params.id });
});
