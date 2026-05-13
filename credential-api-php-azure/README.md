# Campus Digital Credential API - PHP Azure

Ejemplo PHP 8.2+ para el contrato Credential API 2.4.0, separado por IDP.

## Ejecutar

```bash
cp .env.example .env
php -S localhost:3000 -t public
```

```bash
curl 'http://localhost:3000/credentials' \
  -H 'accept: application/json' \
  -H 'Content-type: application/json' \
  -H 'apikey: replace-with-a-strong-shared-api-key' \
  -H 'Authorization: Bearer <Azure-access-token>'
```

## Probar

```bash
php tests/run.php
```

No requiere Composer ni dependencias externas para ejecutarse. Valida JWT RS256 contra JWKS del IDP, API key, headers del contrato, campos obligatorios, ISO 3166 Alpha-2, enums, fechas reales, documentos y evita null/cadenas vacías en campos opcionales presentes.
