import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import prisma from "@/lib/prisma";

type LoginRequestBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    let body: LoginRequestBody = {};

    try {
      body = (await request.json()) as LoginRequestBody;
    } catch {
      return NextResponse.json(
        { error: "بيانات الطلب غير صحيحة." },
        { status: 400 },
      );
    }

    const { email, password } = body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return NextResponse.json(
        { error: "البريد الإلكتروني وكلمة المرور مطلوبة." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) {
      return NextResponse.json(
        { error: "بيانات الدخول غير صحيحة." },
        { status: 401 },
      );
    }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json(
      { error: "بيانات الدخول غير صحيحة." },
      { status: 401 },
    );
  }

    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

    await prisma.session.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 },
    );
    response.cookies.set({
      name: "sessionToken",
      value: token,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
    });

    return response;
  } catch (error) {
    console.error("[auth/login]", error);
    return NextResponse.json(
      { error: "حدث خطأ داخلي. حاول مرة أخرى لاحقاً." },
      { status: 500 },
    );
  }
}
