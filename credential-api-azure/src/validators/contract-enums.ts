import { z } from "zod";

export const documentTypeSchema = z.enum(["run", "rut", "passport", "dni", "cpf", "curp", "nie", "cc", "nif"]);

export const courseTypeSchema = z.enum(["degree", "master", "doctorate", "fp", "subject", "high school", "other"]);

export const additionalValueTypeSchema = z.enum(["text", "image", "link"]);

export const notificationGroupSchema = z.enum([
  "student",
  "services",
  "professor",
  "alumni",
  "online_student",
  "tester",
]);
