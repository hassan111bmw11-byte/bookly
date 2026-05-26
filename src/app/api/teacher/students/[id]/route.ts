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

export async function DELETE(
  request: Request,
  {
    params,
  }: { params: Record<string, string> | Promise<Record<string, string>> },
) {
  try {
    const user = await getUserFromCookie();
    if (!user || user.role !== "TEACHER") {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }

    const resolvedParams = await params;
    const studentId = parseInt(resolvedParams.id, 10);
    if (Number.isNaN(studentId)) {
      return NextResponse.json(
        { error: "معرّف الطالب غير صالح" },
        { status: 400 },
      );
    }

    const student = await prisma.user.findUnique({ where: { id: studentId } });
    if (!student || student.role !== "STUDENT") {
      return NextResponse.json({ error: "الطالب غير موجود" }, { status: 404 });
    }

    // Remove related data that would block deletion, then delete the user.
    await prisma.$transaction([
      prisma.session.deleteMany({ where: { userId: studentId } }),
      prisma.walletTransaction.deleteMany({ where: { userId: studentId } }),
      prisma.user.delete({ where: { id: studentId } }),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[teacher/students DELETE]", error);
    return NextResponse.json({ error: "حدث خطأ داخلي" }, { status: 500 });
  }
}
