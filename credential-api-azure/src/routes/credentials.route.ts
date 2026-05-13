import { Router } from "express";
import { getCredentials } from "../controllers/credentials.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { validateApiKey } from "../middleware/api-key.js";
import { requireCredentialAccess } from "../middleware/require-credential-access.js";
import { validateContractHeaders } from "../middleware/validate-contract-headers.js";
import type { TokenValidator } from "../idp/token-validator.js";

export function credentialsRouter(tokenValidator: TokenValidator): Router {
  const router = Router();

  router.get(
    "/credentials",
    validateContractHeaders,
    validateApiKey,
    authenticate(tokenValidator),
    requireCredentialAccess,
    getCredentials,
  );

  return router;
}
