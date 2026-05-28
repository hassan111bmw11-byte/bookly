import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST() {
  try {
    const cookiesStore = await cookies();
    const sessionToken = cookiesStore.get("sessionToken")?.value;

    if (sessionToken) {
      try {
        await prisma.session.deleteMany({ where: { token: sessionToken } });
      } catch (e) {
        // ignore DB deletion errors
        console.error("Failed to delete session:", e);
      }
    }

    const response = NextResponse.json({ ok: true }, { status: 200 });
    response.cookies.set({
      name: "sessionToken",
      value: "",
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[auth/logout] Error:", message);
    return NextResponse.json(
      { error: "حدث خطأ أثناء تسجيل الخروج." },
      { status: 500 },
    );
  }
}
