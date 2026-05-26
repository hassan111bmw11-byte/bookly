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

    const assignments = await prisma.assignment.findMany({
      where: { teacherId: user.id },
      include: { course: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ assignments }, { status: 200 });
  } catch (error) {
    console.error("[teacher/assignments]", error);
    return NextResponse.json({ error: "حدث خطأ داخلي" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUserFromCookie();
    if (!user || user.role !== "TEACHER") {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, dueDate, courseId } = body;

    if (!title || !dueDate) {
      return NextResponse.json(
        { error: "العنوان وموعد التسليم مطلوبان" },
        { status: 400 },
      );
    }

    const assignment = await prisma.assignment.create({
      data: {
        title,
        description: description || "",
        dueDate: new Date(dueDate),
        teacherId: user.id,
        courseId: courseId ? parseInt(courseId) : null,
      },
    });

    return NextResponse.json({ assignment }, { status: 201 });
  } catch (error) {
    console.error("[teacher/assignments POST]", error);
    return NextResponse.json({ error: "حدث خطأ داخلي" }, { status: 500 });
  }
}
