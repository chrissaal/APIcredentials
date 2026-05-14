# Campus Digital Credential API - Node.js

Ejemplo de implementación para el contrato `openapi_credentials_2_4_0.yml`.

## Qué valida

- `GET /credentials`.
- Header `Authorization: Bearer <token>`.
- Header `apikey`.
- Header `accept: application/json`.
- Header `Content-type: application/json`, como lo pide el contrato aunque sea un `GET`.
- Token JWT contra Google o Azure Entra ID, en módulos separados.
- Permisos básicos por `scope` o `roles`.
- Respuesta `Credential` antes de devolver `200`.
- Formatos de fechas, UUID, país ISO 3166 Alpha-2 asignado, documento nacional y enums del contrato.
- Regla del ejemplo: `person.document.documentNumber`, `issuerEntityCountry` y `documentType` son obligatorios aunque el contrato base no los marque como requeridos.

## Ejecutar

```bash
npm install
cp .env.example .env
npm run dev
```

```bash
curl 'http://localhost:3000/credentials' \
  -H 'accept: application/json' \
  -H 'Content-type: application/json' \
  -H 'apikey: replace-with-a-strong-shared-api-key' \
  -H 'Authorization: Bearer <Google-or-Azure-access-token>'
```

## Selección de IDP

Para Google:

```env
TOKEN_IDP=google
GOOGLE_CLIENT_ID=...
GOOGLE_ALLOWED_HOSTED_DOMAIN=universidad.edu
```

Para Azure:

```env
TOKEN_IDP=azure
AZURE_TENANT_ID=...
AZURE_CLIENT_ID=...
AZURE_ALLOWED_ISSUER=
```

`GOOGLE_ALLOWED_HOSTED_DOMAIN` y `AZURE_ALLOWED_ISSUER` son opcionales. Úsalos si quieres restringir la autenticación a un dominio/tenant específico.

## Estructura

```text
src/
  app.ts
  server.ts
  config/
  controllers/
  errors/
  idp/
  middleware/
  repositories/
  routes/
  schemas/
  services/
  validators/
```

El repositorio incluido es simulado. En producción, reemplaza `userCredential.repository.ts` por una integración con tu base de datos institucional.

## Validación ISO 3166

El contrato apunta al ISO Online Browsing Platform para `issuerEntityCountry` y `nationality.countryCode`.
Este ejemplo valida esos campos con `i18n-iso-countries`, que contiene una tabla local de códigos ISO 3166 Alpha-2 asignados.

No se consulta la página de ISO en cada request porque añadiría latencia, dependencia externa y posibles fallos por disponibilidad.
Para producción estricta, lo recomendable es tener un job de sincronización controlado contra la fuente oficial de ISO/OBP o la colección descargable autorizada, y que el API valide contra esa tabla versionada.
