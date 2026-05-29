import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const teacher = await prisma.user.findFirst({
      where: { role: "TEACHER" },
      select: { id: true, name: true, avatarUrl: true },
      orderBy: { createdAt: "desc" },
    });

    if (!teacher)
      return new Response(JSON.stringify({}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });

    return new Response(JSON.stringify(teacher), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60, s-maxage=300",
      },
    });
  } catch (err) {
    console.error("/api/landing/featured-teacher error", err);
    return new Response(JSON.stringify({}), { status: 500 });
  }
}
