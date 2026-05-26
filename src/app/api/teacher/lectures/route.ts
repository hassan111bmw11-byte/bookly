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

    const lectures = await prisma.lecture.findMany({
      where: { teacherId: user.id },
      include: { course: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ lectures }, { status: 200 });
  } catch (error) {
    console.error("[teacher/lectures]", error);
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
    const { title, description, videoUrl, courseId } = body;

    if (!title || !videoUrl) {
      return NextResponse.json(
        { error: "العنوان و رابط الفيديو مطلوبان" },
        { status: 400 },
      );
    }

    const lecture = await prisma.lecture.create({
      data: {
        title,
        description: description || "",
        videoUrl,
        teacherId: user.id,
        courseId: courseId ? parseInt(courseId) : null,
      },
    });

    return NextResponse.json({ lecture }, { status: 201 });
  } catch (error) {
    console.error("[teacher/lectures POST]", error);
    return NextResponse.json({ error: "حدث خطأ داخلي" }, { status: 500 });
  }
}
