import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ error: "معرّف غير صالح" }, { status: 400 });
    }
    await prisma.user.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[api/delete]", error);
    return NextResponse.json({ error: "حدث خطأ داخلي" }, { status: 500 });
  }
}
