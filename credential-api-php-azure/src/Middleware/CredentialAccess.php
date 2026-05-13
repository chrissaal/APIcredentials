<?php
declare(strict_types=1);
namespace CredentialApi\Middleware;
use CredentialApi\Errors\HttpError; use CredentialApi\Types\AuthenticatedUser;
final class CredentialAccess { public static function require(AuthenticatedUser $u): void { if(array_intersect($u->scopes,['credentials.read','profile','openid'])===[] && array_intersect($u->roles,['Credential.Read','Credential.Reader'])===[]) throw new HttpError(403,'User is not authorized to access this resource'); } }
