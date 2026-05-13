export type IdentityProvider = "google" | "azure";

export interface AuthenticatedUser {
  provider: IdentityProvider;
  subject: string;
  email?: string;
  name?: string;
  roles: string[];
  scopes: string[];
  rawClaims: Record<string, unknown>;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}
