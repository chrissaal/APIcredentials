import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env.js";
import { HttpError } from "../errors/http-error.js";

export function validateApiKey(req: Request, _res: Response, next: NextFunction): void {
  const apiKey = req.header("apikey");

  if (!apiKey || apiKey !== env.API_KEY) {
    throw new HttpError(403, "API key is missing or invalid");
  }

  next();
}
