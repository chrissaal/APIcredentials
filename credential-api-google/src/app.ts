import cors from "cors";
import express from "express";
import helmet from "helmet";
import { errorHandler } from "./middleware/error-handler.js";
import { credentialsRouter } from "./routes/credentials.route.js";
import type { TokenValidator } from "./idp/token-validator.js";

export function createApp(tokenValidator: TokenValidator) {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({ origin: false }));
  app.use(express.json({ limit: "1mb" }));

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.use(credentialsRouter(tokenValidator));
  app.use(errorHandler);

  return app;
}
