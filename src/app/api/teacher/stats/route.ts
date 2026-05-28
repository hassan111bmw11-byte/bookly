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

    const lecturesCount = await prisma.lecture.count({
      where: { teacherId: user.id },
    });

    const assignmentsCount = await prisma.assignment.count({
      where: { teacherId: user.id },
    });

    const examsCount = await prisma.exam.count({
      where: { teacherId: user.id },
    });

    const studentsCount = await prisma.user.count({
      where: { role: "STUDENT" },
    });

    const totalCodes = await prisma.chargeCode.count({
      where: { teacherId: user.id },
    });

    const unusedCodes = await prisma.chargeCode.count({
      where: { teacherId: user.id, status: "ACTIVE" },
    });

    const usedCodes = await prisma.chargeCode.count({
      where: { teacherId: user.id, status: "USED" },
    });

    const canceledCodes = await prisma.chargeCode.count({
      where: { teacherId: user.id, status: "CANCELED" },
    });

    return NextResponse.json(
      {
        stats: {
          lectures: lecturesCount,
          assignments: assignmentsCount,
          exams: examsCount,
          students: studentsCount,
          totalCodes,
          unusedCodes,
          usedCodes,
          canceledCodes,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[teacher/stats]", error);
    return NextResponse.json({ error: "حدث خطأ داخلي" }, { status: 500 });
  }
}
