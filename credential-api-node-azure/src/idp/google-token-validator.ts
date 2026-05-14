import { createRemoteJWKSet, jwtVerify } from "jose";
import type { AuthenticatedUser } from "../types/auth.js";
import type { TokenValidator } from "./token-validator.js";

const googleJwks = createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"));

export class GoogleTokenValidator implements TokenValidator {
  constructor(
    private readonly clientId: string,
    private readonly allowedHostedDomain?: string,
  ) {}

  async validate(accessToken: string): Promise<AuthenticatedUser> {
    const { payload } = await jwtVerify(accessToken, googleJwks, {
      audience: this.clientId,
      issuer: ["https://accounts.google.com", "accounts.google.com"],
    });

    if (!payload.sub) {
      throw new Error("Google token does not contain sub claim");
    }

    if (this.allowedHostedDomain && payload.hd !== this.allowedHostedDomain) {
      throw new Error("Google token hosted domain is not allowed");
    }

    const scopeClaim = typeof payload.scope === "string" ? payload.scope : "";

    return {
      provider: "google",
      subject: payload.sub,
      email: typeof payload.email === "string" ? payload.email : undefined,
      name: typeof payload.name === "string" ? payload.name : undefined,
      roles: [],
      scopes: scopeClaim.split(" ").filter(Boolean),
      rawClaims: payload,
    };
  }
}
