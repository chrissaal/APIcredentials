import type { AuthenticatedUser } from "../types/auth.js";

export interface TokenValidator {
  validate(accessToken: string): Promise<AuthenticatedUser>;
}

export function extractBearerToken(authorizationHeader: string | undefined): string {
  if (!authorizationHeader) {
    throw new Error("Authorization header is required");
  }

  const [scheme, token] = authorizationHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    throw new Error("Authorization header must use Bearer scheme");
  }

  return token;
}
