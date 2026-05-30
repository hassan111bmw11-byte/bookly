import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const teachers = await prisma.user.findMany({
      where: { role: "TEACHER" },
      select: { id: true, name: true, email: true },
      take: 4,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      { teachers },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=60, s-maxage=300",
        },
      },
    );
  } catch (error) {
    console.error("[landing/teachers]", error);
    return NextResponse.json({ teachers: [] }, { status: 200 });
  }
}
