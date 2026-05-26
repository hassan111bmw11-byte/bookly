import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

async function getUserFromCookie() {
  const cookiesStore = await cookies();
  const sessionToken = cookiesStore.get("sessionToken")?.value;

  if (!sessionToken) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { token: sessionToken },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    return null;
  }

  return session.user;
}

export async function GET() {
  try {
    const user = await getUserFromCookie();
    if (!user || user.role !== "STUDENT") {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }

    const lectures = await prisma.lecture.findMany({
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
          },
        },
        course: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ lectures }, { status: 200 });
  } catch (error) {
    console.error("[student/lectures]", error);
    return NextResponse.json({ error: "حدث خطأ داخلي" }, { status: 500 });
  }
}
