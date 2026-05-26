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
    if (!user || user.role !== "TEACHER") {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }

    const students = await prisma.user.findMany({
      where: { role: "STUDENT" },
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        walletTransactions: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const mapped = students.map((s) => {
      const balance = s.walletTransactions.reduce(
        (acc: number, t: any) =>
          acc + (t.type === "CREDIT" ? t.amount : -t.amount),
        0,
      );
      return {
        id: s.id,
        name: s.name,
        phoneNumber: s.phoneNumber,
        walletBalance: balance,
      };
    });

    return NextResponse.json({ students: mapped }, { status: 200 });
  } catch (error) {
    console.error("[teacher/wallet]", error);
    return NextResponse.json({ error: "حدث خطأ داخلي" }, { status: 500 });
  }
}
