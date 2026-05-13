<?php
declare(strict_types=1);
namespace CredentialApi\Middleware;
use CredentialApi\Config\Env; use CredentialApi\Errors\HttpError; use CredentialApi\Http\Headers;
final class ApiKey { public static function validate(): void { if(Headers::get('apikey')!==Env::required('API_KEY'))throw new HttpError(403,'API key is missing or invalid'); } }
