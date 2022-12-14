// @ts-check
import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  DATABASE_URL: z
    .string({
      required_error: "DATABASE_URL is required",
      invalid_type_error: "DATABASE_URL must be a string",
    })
    .url({ message: "Invalid Database URL" }),
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXTAUTH_SECRET:
    process.env.NODE_ENV === "production"
      ? z
          .string({
            required_error: "NEXTAUTH_SECRET is required",
            invalid_type_error: "NEXTAUTH_SECRET must be a string",
          })
          .min(1)
      : z.string().min(1).optional(),
  NEXTAUTH_URL: z.preprocess(
    // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    // Since NextAuth.js automatically uses the VERCEL_URL if present.
    (str) => process.env.VERCEL_URL ?? str,
    // VERCEL_URL doesn't include `https` so it cant be validated as a URL
    process.env.VERCEL
      ? z.string({
          required_error: "NEXTAUTH_URL is required",
          invalid_type_error: "NEXTAUTH_URL must be a string",
        })
      : z
          .string({
            required_error: "NEXTAUTH_URL is required",
            invalid_type_error: "NEXTAUTH_URL must be a string",
          })
          .url({ message: "Invalid NEXTAUTH_URL" })
  ),
  DISCORD_CLIENT_ID: z.string({
    required_error: "DISCORD_CLIENT_ID is required",
    invalid_type_error: "DISCORD_CLIENT_ID must be a string",
  }),
  DISCORD_CLIENT_SECRET: z.string({
    required_error: "DISCORD_CLIENT_SECRET is required",
    invalid_type_error: "DISCORD_CLIENT_SECRET must be a string",
  }),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
};
