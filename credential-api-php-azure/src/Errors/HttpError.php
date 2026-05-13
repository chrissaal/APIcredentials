<?php
declare(strict_types=1);
namespace CredentialApi\Errors;
use RuntimeException;
final class HttpError extends RuntimeException { public function __construct(public readonly int $statusCode, string $message){ parent::__construct($message); } }
