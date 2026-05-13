<?php
declare(strict_types=1);
namespace CredentialApi\Config;
use CredentialApi\Errors\HttpError;
final class Env {
    public static function load(string $root): void { $f=$root.'/.env'; if(!is_file($f)) return; foreach(file($f, FILE_IGNORE_NEW_LINES|FILE_SKIP_EMPTY_LINES) ?: [] as $line){ $line=trim($line); if($line===''||str_starts_with($line,'#')||!str_contains($line,'=')) continue; [$k,$v]=explode('=',$line,2); $k=trim($k); $v=trim($v," \t\n\r\0\x0B\"'"); $_ENV[$k]=$v; putenv($k.'='.$v);} }
    public static function get(string $k, ?string $d=null): ?string { $v=getenv($k); return $v!==false ? $v : ($_ENV[$k] ?? $d); }
    public static function required(string $k): string { $v=self::get($k); if($v===null||trim($v)==='') throw new HttpError(500,"Missing required environment variable {$k}"); return $v; }
    public static function env(): string { return self::get('NODE_ENV','development') ?: 'development'; }
}
