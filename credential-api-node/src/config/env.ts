import "dotenv/config";
import { z } from "zod";

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().int().positive().default(3000),
    API_KEY: z.string().min(16, "API_KEY must contain at least 16 characters"),
    TOKEN_IDP: z.enum(["google", "azure"]),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_ALLOWED_HOSTED_DOMAIN: z.string().optional(),
    AZURE_TENANT_ID: z.string().optional(),
    AZURE_CLIENT_ID: z.string().optional(),
    AZURE_ALLOWED_ISSUER: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.TOKEN_IDP === "google" && !value.GOOGLE_CLIENT_ID) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["GOOGLE_CLIENT_ID"],
        message: "GOOGLE_CLIENT_ID is required when TOKEN_IDP=google",
      });
    }

    if (value.TOKEN_IDP === "azure") {
      if (!value.AZURE_TENANT_ID) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["AZURE_TENANT_ID"],
          message: "AZURE_TENANT_ID is required when TOKEN_IDP=azure",
        });
      }

      if (!value.AZURE_CLIENT_ID) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["AZURE_CLIENT_ID"],
          message: "AZURE_CLIENT_ID is required when TOKEN_IDP=azure",
        });
      }
    }
  });

export const env = envSchema.parse(process.env);
