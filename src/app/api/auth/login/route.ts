import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import {
  SESSION_COOKIE_NAME,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/session";
import { loginSchema } from "@/lib/validators";

function createNameFromEmail(email: string) {
  const localPart = email.split("@")[0]?.replace(/[._-]+/g, " ").trim();

  if (!localPart) {
    return "Nieuwe gebruiker";
  }

  return localPart
    .split(" ")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const url = new URL("/login", request.url);
    url.searchParams.set("error", "invalid_data");
    return NextResponse.redirect(url, { status: 303 });
  }

  const email = parsed.data.email.toLowerCase().trim();
  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    const passwordHash = await bcrypt.hash(parsed.data.password, 12);

    try {
      user = await prisma.user.create({
        data: {
          email,
          name: createNameFromEmail(email),
          passwordHash,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        user = await prisma.user.findUnique({ where: { email } });
      } else {
        throw error;
      }
    }
  }

  if (!user) {
    const url = new URL("/login", request.url);
    url.searchParams.set("error", "invalid_credentials");
    return NextResponse.redirect(url, { status: 303 });
  }

  const isValidPassword = await bcrypt.compare(parsed.data.password, user.passwordHash);

  if (!isValidPassword) {
    const url = new URL("/login", request.url);
    url.searchParams.set("error", "invalid_credentials");
    return NextResponse.redirect(url, { status: 303 });
  }

  const sessionToken = await createSessionToken(user.id);
  const response = NextResponse.redirect(new URL("/dashboard", request.url), {
    status: 303,
  });

  response.cookies.set(SESSION_COOKIE_NAME, sessionToken, sessionCookieOptions);
  return response;
}
