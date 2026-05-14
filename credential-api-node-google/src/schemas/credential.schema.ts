import { z } from "zod";
import { isoAlpha2CountryCodeSchema } from "../validators/country.validator.js";
import {
  additionalValueTypeSchema,
  courseTypeSchema,
  notificationGroupSchema,
} from "../validators/contract-enums.js";
import { documentSchema } from "../validators/document.validator.js";

const nonEmptyStringSchema = z.string().trim().min(1);

const isoDateSchema = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
  .refine((value) => {
    const date = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }, "Date must be a valid ISO 8601 calendar date");

const personNameSchema = z.object({
  givenName: nonEmptyStringSchema.max(50),
  lastName: nonEmptyStringSchema.max(50),
  secondLastName: nonEmptyStringSchema.max(50).optional(),
});

const contactPointSchema = z.object({
  telephone: nonEmptyStringSchema.optional(),
  emailAddress: z.string().email(),
});

const nationalitySchema = z.object({
  countryCode: isoAlpha2CountryCodeSchema,
});

const courseSchema = z.object({
  name: nonEmptyStringSchema.max(50),
  type: courseTypeSchema,
});

const additionalUniversityUserDataSchema = z.object({
  label: nonEmptyStringSchema,
  value: nonEmptyStringSchema,
  valueType: additionalValueTypeSchema.default("text"),
});

const roleSchema = z.object({
  name: nonEmptyStringSchema,
});

const universitySchema = z.object({
  universityId: z.string().uuid(),
});

const userImageSchema = z.object({
  url: z.string().url(),
});

const userUniversitySchema = z.object({
  userId: nonEmptyStringSchema,
  creationDate: isoDateSchema.optional(),
  userImage: userImageSchema,
  courses: z.array(courseSchema).min(1).optional(),
  additionalUniversityUserData: z.array(additionalUniversityUserDataSchema).min(1).optional(),
  role: roleSchema.optional(),
  university: universitySchema.optional(),
});

const userNotificationsGroupsSchema = z.object({
  mandatory: z.array(notificationGroupSchema).min(1),
  optional: z.array(nonEmptyStringSchema).min(1).optional(),
});

const personSchema = z.object({
  personName: personNameSchema,
  contactPoint: contactPointSchema.optional(),
  document: documentSchema,
  nationality: nationalitySchema.optional(),
  birthDate: isoDateSchema,
});

export const credentialSchema = z.object({
  person: personSchema,
  userUniversities: z.array(userUniversitySchema).min(1),
  userNotificationsGroups: userNotificationsGroupsSchema.optional(),
});

export type Credential = z.infer<typeof credentialSchema>;
