import { z } from "zod";

const passwordRule = z
  .string()
  .min(8, "Wachtwoord moet minimaal 8 tekens zijn.")
  .max(128, "Wachtwoord mag maximaal 128 tekens zijn.");

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Naam moet minimaal 2 tekens zijn.")
      .max(60, "Naam mag maximaal 60 tekens zijn."),
    email: z.email("Voer een geldig e-mailadres in."),
    password: passwordRule,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Wachtwoorden komen niet overeen.",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email("Voer een geldig e-mailadres in."),
  password: passwordRule,
});
