import { z } from "zod";
import { isoAlpha2CountryCodeSchema } from "./country.validator.js";
import { documentTypeSchema } from "./contract-enums.js";

const documentPatterns: Partial<Record<string, RegExp>> = {
  dni: /^[A-Za-z0-9]+$/,
  cpf: /^\d{11}$/,
  curp: /^[A-Za-z]{4}\d{6}[A-Za-z]{6}[A-Za-z0-9]{2}$/,
  nie: /^[A-Za-z0-9]+$/,
  cc: /^\d{9}[A-Za-z]{2}\d$/,
  nif: /^\d{9}$/,
  run: /^\d{7,9}[0-9Kk]?$/,
  rut: /^\d{7,9}[0-9Kk]?$/,
  passport: /^[A-Za-z0-9]+$/,
};

export const documentSchema = z
  .object({
    documentNumber: z.string().regex(/^[A-Za-z0-9]+$/, "No spaces or punctuation are allowed"),
    issuerEntityCountry: isoAlpha2CountryCodeSchema,
    documentType: documentTypeSchema,
  })
  .superRefine((document, ctx) => {
    const pattern = documentPatterns[document.documentType];
    if (pattern && !pattern.test(document.documentNumber)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["documentNumber"],
        message: `documentNumber does not match ${document.documentType} format`,
      });
    }
  });
