<?php
declare(strict_types=1);
namespace CredentialApi\Errors;
use RuntimeException;
final class ValidationError extends RuntimeException { public function __construct(public readonly array $issues){ parent::__construct('Credential response does not match API contract'); } }
