import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/http-error.js";

function firstHeaderValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function validateContractHeaders(req: Request, _res: Response, next: NextFunction): void {
  const accept = firstHeaderValue(req.headers.accept);
  const contentType = firstHeaderValue(req.headers["content-type"]);

  if (accept !== "application/json") {
    throw new HttpError(400, "Header accept must be application/json");
  }

  if (contentType !== "application/json") {
    throw new HttpError(400, "Header Content-type must be application/json");
  }

  next();
}
