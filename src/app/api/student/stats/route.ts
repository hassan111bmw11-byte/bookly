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

    const lecturesCount = await prisma.lecture.count();
    const assignmentsCount = await prisma.assignment.count();
    const examsCount = await prisma.exam.count();

    const walletBalance = await prisma.walletTransaction.aggregate({
      where: { userId: user.id },
      _sum: {
        amount: true,
      },
    });

    return NextResponse.json(
      {
        stats: {
          lectures: lecturesCount,
          assignments: assignmentsCount,
          exams: examsCount,
          wallet: walletBalance._sum.amount || 0,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[student/stats]", error);
    return NextResponse.json({ error: "حدث خطأ داخلي" }, { status: 500 });
  }
}
