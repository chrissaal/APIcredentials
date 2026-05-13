<?php
declare(strict_types=1);
namespace CredentialApi\Services;
use CredentialApi\Errors\HttpError; use CredentialApi\Repositories\UserCredentialRepository; use CredentialApi\Types\AuthenticatedUser; use CredentialApi\Validators\CredentialValidator;
final class CredentialService { public function __construct(private readonly UserCredentialRepository $repo){} public function getCredentialForUser(AuthenticatedUser $user): array { $c=$this->repo->findBySubject($user->subject); if($c===null)throw new HttpError(404,'User not found on university data base'); if(($c['userUniversities']??[])===[])throw new HttpError(204,'User has been found, but the user has no content'); return CredentialValidator::validate($c); } }
