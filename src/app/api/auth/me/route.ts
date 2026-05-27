import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "خادم قاعدة البيانات غير مهيأ." },
      { status: 500 },
    );
  }
  try {
    const cookiesStore = await cookies();
    const sessionToken = cookiesStore.get("sessionToken")?.value;

    if (!sessionToken) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const session = await prisma.session.findUnique({
      where: { token: sessionToken },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const { user } = session;
    return NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[auth/me] Error:", errorMessage);
    console.error("[auth/me] Full error:", error);
    return NextResponse.json(
      { error: "حدث خطأ داخلي. حاول مرة أخرى لاحقاً." },
      { status: 500 },
    );
  }
}
