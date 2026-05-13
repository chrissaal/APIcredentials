import { createRemoteJWKSet, jwtVerify } from "jose";
import type { AuthenticatedUser } from "../types/auth.js";
import type { TokenValidator } from "./token-validator.js";

export class AzureTokenValidator implements TokenValidator {
  private readonly jwks: ReturnType<typeof createRemoteJWKSet>;

  constructor(
    private readonly tenantId: string,
    private readonly clientId: string,
    private readonly allowedIssuer?: string,
  ) {
    this.jwks = createRemoteJWKSet(
      new URL(`https://login.microsoftonline.com/${tenantId}/discovery/v2.0/keys`),
    );
  }

  async validate(accessToken: string): Promise<AuthenticatedUser> {
    const issuer = this.allowedIssuer ?? `https://login.microsoftonline.com/${this.tenantId}/v2.0`;
    const { payload } = await jwtVerify(accessToken, this.jwks, {
      audience: this.clientId,
      issuer,
    });

    if (!payload.sub && !payload.oid) {
      throw new Error("Azure token does not contain sub or oid claim");
    }

    const roles = Array.isArray(payload.roles)
      ? payload.roles.filter((role): role is string => typeof role === "string")
      : [];
    const scopeClaim = typeof payload.scp === "string" ? payload.scp : "";

    return {
      provider: "azure",
      subject: typeof payload.oid === "string" ? payload.oid : String(payload.sub),
      email:
        typeof payload.preferred_username === "string"
          ? payload.preferred_username
          : typeof payload.email === "string"
            ? payload.email
            : undefined,
      name: typeof payload.name === "string" ? payload.name : undefined,
      roles,
      scopes: scopeClaim.split(" ").filter(Boolean),
      rawClaims: payload,
    };
  }
}
