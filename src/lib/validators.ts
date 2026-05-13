import { z } from "zod";

const passwordRule = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password too long");

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: passwordRule,
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name is too short").max(60, "Name is too long"),
    email: z.email("Invalid email"),
    password: passwordRule,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
