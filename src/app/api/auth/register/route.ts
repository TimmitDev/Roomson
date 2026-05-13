import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import {
  SESSION_COOKIE_NAME,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/session";
import { registerSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return NextResponse.redirect(new URL("/register?error=invalid_data", request.url), {
      status: 303,
    });
  }

  const name = parsed.data.name.trim();
  const email = parsed.data.email.toLowerCase().trim();

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.redirect(new URL("/register?error=email_taken", request.url), {
      status: 303,
    });
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

  const sessionToken = await createSessionToken(user.id);
  const response = NextResponse.redirect(new URL("/dashboard", request.url), {
    status: 303,
  });

  response.cookies.set(SESSION_COOKIE_NAME, sessionToken, sessionCookieOptions);
  return response;
}
