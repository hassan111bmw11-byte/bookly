import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import prisma from "@/lib/prisma";

type RegisterRequestBody = {
  name?: string;
  email?: string;
  phone?: string;
  guardianPhone?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    let body: RegisterRequestBody = {};

    try {
      body = (await request.json()) as RegisterRequestBody;
    } catch {
      return NextResponse.json(
        { error: "بيانات الطلب غير صحيحة." },
        { status: 400 },
      );
    }

    const { name, email, phone, guardianPhone, password } = body;

    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { error: "جميع الحقول مطلوبة." },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (existing) {
      return NextResponse.json(
        { error: "البريد الإلكتروني مستخدم بالفعل." },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        phoneNumber: phone,
        parentPhoneNumber: guardianPhone || null,
        password: hashedPassword,
        role: "STUDENT",
      },
    });

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
      { status: 201 },
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
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[auth/register] Error:", errorMessage);
    console.error("[auth/register] Full error:", error);
    return NextResponse.json(
      { error: "حدث خطأ داخلي. حاول مرة أخرى لاحقاً." },
      { status: 500 },
    );
  }
}
