<?php
declare(strict_types=1);
namespace CredentialApi\Http;
final class Headers { public static function get(string $name): ?string { $key='HTTP_'.strtoupper(str_replace('-','_',$name)); if(isset($_SERVER[$key])&&is_string($_SERVER[$key])) return $_SERVER[$key]; if(strtolower($name)==='content-type'&&isset($_SERVER['CONTENT_TYPE'])&&is_string($_SERVER['CONTENT_TYPE'])) return $_SERVER['CONTENT_TYPE']; return null; } }
