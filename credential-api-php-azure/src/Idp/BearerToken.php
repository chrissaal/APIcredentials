<?php
declare(strict_types=1);
namespace CredentialApi\Idp;
use CredentialApi\Errors\HttpError;
final class BearerToken { public static function extract(?string $h): string { if($h===null||!preg_match('/^Bearer\s+(.+)$/',$h,$m)) throw new HttpError(401,'Access token is missing or invalid'); return $m[1]; } }
