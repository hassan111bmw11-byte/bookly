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

    const wallet = await prisma.walletTransaction.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    const balance = wallet.reduce(
      (acc: number, t: (typeof wallet)[0]) =>
        acc + (t.type === "CREDIT" ? t.amount : -t.amount),
      0,
    );

    return NextResponse.json(
      { balance, transactions: wallet },
      { status: 200 },
    );
  } catch (error) {
    console.error("[student/wallet]", error);
    return NextResponse.json({ error: "حدث خطأ داخلي" }, { status: 500 });
  }
}
