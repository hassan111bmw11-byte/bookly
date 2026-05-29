import prisma from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { userId, name, avatarUrl } = body;
    if (!userId)
      return new Response(JSON.stringify({ error: "userId مطلوب" }), {
        status: 400,
      });

    const updated = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        name: name ?? undefined,
        avatarUrl: avatarUrl ?? undefined,
      },
    });

    return new Response(JSON.stringify({ user: updated }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("/api/teacher/profile error", err);
    return new Response(JSON.stringify({ error: "فشل تحديث البروفايل" }), {
      status: 500,
    });
  }
}
