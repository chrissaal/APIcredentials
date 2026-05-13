<?php
declare(strict_types=1);
namespace CredentialApi\Types;
final class AuthenticatedUser { public function __construct(public readonly string $provider, public readonly string $subject, public readonly ?string $email, public readonly ?string $name, public readonly array $roles, public readonly array $scopes, public readonly array $rawClaims){} }
