<?php
declare(strict_types=1);
namespace CredentialApi\Controllers;
use CredentialApi\Services\CredentialService; use CredentialApi\Types\AuthenticatedUser;
final class CredentialsController { public function __construct(private readonly CredentialService $service){} public function getCredentials(AuthenticatedUser $user): array { return $this->service->getCredentialForUser($user); } }
