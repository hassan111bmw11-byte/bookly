import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { handleFileUpload } from "@/lib/file-upload";
import type { FileType } from "@prisma/client";

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

    const files = await prisma.fileResource.findMany({
      where: { teacherId: user.id },
      include: { course: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ files }, { status: 200 });
  } catch (error) {
    console.error("[teacher/files]", error);
    return NextResponse.json({ error: "حدث خطأ داخلي" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUserFromCookie();
    if (!user || user.role !== "TEACHER") {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const type = formData.get("type") as string;
    const courseId = formData.get("courseId") as string;

    if (!title) {
      return NextResponse.json({ error: "العنوان مطلوب" }, { status: 400 });
    }

    const url = await handleFileUpload(formData, "files");

    const validTypes: FileType[] = ["DOCUMENT", "VIDEO", "OTHER"];
    const fileType = (
      validTypes.includes(type as FileType) ? type : "DOCUMENT") as FileType;

    const file = await prisma.fileResource.create({
      data: {
        title,
        url,
        type: fileType,
        teacherId: user.id,
        courseId: courseId ? parseInt(courseId) : null,
      },
    });

    return NextResponse.json({ file }, { status: 201 });
  } catch (error) {
    console.error("[teacher/files POST]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "حدث خطأ داخلي" },
      { status: 500 },
    );
  }
}
