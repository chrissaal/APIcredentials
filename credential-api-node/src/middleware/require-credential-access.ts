import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/http-error.js";

const allowedScopes = new Set(["credentials.read", "profile", "openid"]);
const allowedRoles = new Set(["Credential.Read", "Credential.Reader"]);

export function requireCredentialAccess(req: Request, _res: Response, next: NextFunction): void {
  const user = req.user;
  if (!user) {
    throw new HttpError(401, "Authenticated user is required");
  }

  const hasScope = user.scopes.some((scope) => allowedScopes.has(scope));
  const hasRole = user.roles.some((role) => allowedRoles.has(role));

  if (!hasScope && !hasRole) {
    throw new HttpError(403, "User is not authorized to access this resource");
  }

  next();
}
