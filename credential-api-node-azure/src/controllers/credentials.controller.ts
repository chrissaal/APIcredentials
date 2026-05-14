import type { Request, Response } from "express";
import { HttpError } from "../errors/http-error.js";
import { getCredentialForUser } from "../services/credential.service.js";

export async function getCredentials(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    throw new HttpError(401, "Authenticated user is required");
  }

  const credential = await getCredentialForUser(req.user);
  res.status(200).json(credential);
}
