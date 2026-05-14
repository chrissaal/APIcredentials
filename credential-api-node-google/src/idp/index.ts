import { env } from "../config/env.js";
import { AzureTokenValidator } from "./azure-token-validator.js";
import { GoogleTokenValidator } from "./google-token-validator.js";
import type { TokenValidator } from "./token-validator.js";

export function createTokenValidator(): TokenValidator {
  if (env.TOKEN_IDP === "google") {
    return new GoogleTokenValidator(env.GOOGLE_CLIENT_ID!, env.GOOGLE_ALLOWED_HOSTED_DOMAIN);
  }

  return new AzureTokenValidator(env.AZURE_TENANT_ID!, env.AZURE_CLIENT_ID!, env.AZURE_ALLOWED_ISSUER);
}
