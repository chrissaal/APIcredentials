import { HttpError } from "../errors/http-error.js";
import { credentialSchema, type Credential } from "../schemas/credential.schema.js";
import { findCredentialBySubject } from "../repositories/userCredential.repository.js";
import type { AuthenticatedUser } from "../types/auth.js";

export async function getCredentialForUser(user: AuthenticatedUser): Promise<Credential> {
  const credential = await findCredentialBySubject(user.subject);

  if (!credential) {
    throw new HttpError(404, "User not found on university data base");
  }

  if (credential.userUniversities.length === 0) {
    throw new HttpError(204, "User has been found, but the user has no content");
  }

  return credentialSchema.parse(credential);
}
