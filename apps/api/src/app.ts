import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { errorMiddleware } from "./middlewares/error";

import { authRoutes } from "./modules/auth/auth.routes";
import { jobsRoutes } from "./modules/jobs/jobs.routes";
import { emergencyRoutes } from "./modules/emergency/emergency.routes";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.WEB_ORIGIN, credentials: true }));
  app.use(express.json({ limit: "5mb" }));
  app.use(morgan("dev"));

  app.get("/health", (_, res) => res.json({ ok: true }));

  app.use("/v1/auth", authRoutes);
  app.use("/v1/jobs", jobsRoutes);
  app.use("/v1/emergency", emergencyRoutes);

  app.use(errorMiddleware);

  return app;
}