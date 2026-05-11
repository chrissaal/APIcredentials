import countries from "i18n-iso-countries";
import { z } from "zod";

export const isoAlpha2CountryCodeSchema = z
  .string()
  .length(2)
  .regex(/^[A-Z]{2}$/, "Country code must use ISO 3166 Alpha-2 uppercase format")
  .refine((countryCode) => countries.isValid(countryCode), {
    message: "Country code is not assigned in ISO 3166 Alpha-2",
  });

export function isIsoAlpha2CountryCode(countryCode: string): boolean {
  return isoAlpha2CountryCodeSchema.safeParse(countryCode).success;
}
