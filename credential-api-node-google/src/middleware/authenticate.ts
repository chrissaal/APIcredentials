import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/http-error.js";
import type { TokenValidator } from "../idp/token-validator.js";
import { extractBearerToken } from "../idp/token-validator.js";

export function authenticate(tokenValidator: TokenValidator) {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = extractBearerToken(req.header("authorization"));
      req.user = await tokenValidator.validate(token);
      next();
    } catch (error) {
      next(new HttpError(401, "Access token is missing or invalid", error));
    }
  };
}
