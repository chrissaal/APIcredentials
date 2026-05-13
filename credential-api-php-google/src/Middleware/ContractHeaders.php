<?php
declare(strict_types=1);
namespace CredentialApi\Middleware;
use CredentialApi\Errors\HttpError; use CredentialApi\Http\Headers;
final class ContractHeaders { public static function validate(): void { if(Headers::get('accept')!=='application/json')throw new HttpError(400,'Header accept must be application/json'); if(Headers::get('content-type')!=='application/json')throw new HttpError(400,'Header Content-type must be application/json'); } }
