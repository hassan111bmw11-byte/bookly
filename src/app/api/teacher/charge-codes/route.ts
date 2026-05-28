import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import prisma from "@/lib/prisma";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function generateCode(length = 12) {
  const bytes = randomBytes(length);
  return Array.from(bytes)
    .map((byte) => ALPHABET[byte % ALPHABET.length])
    .join("");
}

async function getUserFromCookie() {
  const cookiesStore = await cookies();
  const sessionToken = cookiesStore.get("sessionToken")?.value;
  if (!sessionToken) return null;

  const session = await prisma.session.findUnique({
    where: { token: sessionToken },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) return null;
  return session.user;
}

const serializeCode = (code: any) => ({
  ...code,
  expiresAt: code.expiresAt.toISOString(),
});

export async function GET() {
  try {
    const user = await getUserFromCookie();
    if (!user || user.role !== "TEACHER") {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }

    const codes = await prisma.chargeCode.findMany({
      where: { teacherId: user.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const unusedCount = await prisma.chargeCode.count({
      where: { teacherId: user.id, status: "ACTIVE" },
    });
    const usedCount = await prisma.chargeCode.count({
      where: { teacherId: user.id, status: "USED" },
    });
    const canceledCount = await prisma.chargeCode.count({
      where: { teacherId: user.id, status: "CANCELED" },
    });
    const totalCount = await prisma.chargeCode.count({
      where: { teacherId: user.id },
    });

    const totalValueResult = await prisma.chargeCode.aggregate({
      where: { teacherId: user.id },
      _sum: { amount: true },
    });
    const totalValue = totalValueResult._sum.amount || 0;

    return NextResponse.json(
      {
        codes: codes.map(serializeCode),
        stats: {
          total: totalCount,
          unused: unusedCount,
          used: usedCount,
          canceled: canceledCount,
          totalValue,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[teacher/charge-codes] GET", error);
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
    const count = Number(body.count) || 20;
    const amount = Number(body.amount) || 100;

    if (count < 1 || count > 50) {
      return NextResponse.json(
        { error: "الحد الأقصى لعدد الأكواد هو 50." },
        { status: 400 },
      );
    }
    if (amount <= 0) {
      return NextResponse.json(
        { error: "قيمة الكود يجب أن تكون أكبر من صفر." },
        { status: 400 },
      );
    }

    const codes = [];
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

    while (codes.length < count) {
      const code = generateCode(12);
      try {
        const created = await prisma.chargeCode.create({
          data: {
            code,
            amount,
            expiresAt,
            status: "ACTIVE",
            teacherId: user.id,
          },
        });
        codes.push(created);
      } catch (error) {
        const err = error as Error;
        if (err.message.includes("Unique") || err.message.includes("unique")) {
          continue;
        }
        throw error;
      }
    }

    return NextResponse.json(
      {
        codes: codes.map(serializeCode),
        stats: {
          total: codes.length,
          unused: codes.length,
          used: 0,
          canceled: 0,
          totalValue: codes.reduce((sum, code) => sum + code.amount, 0),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[teacher/charge-codes] POST", error);
    return NextResponse.json({ error: "حدث خطأ داخلي" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getUserFromCookie();
    if (!user || user.role !== "TEACHER") {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }

    const body = await request.json();
    const id = Number(body.id);
    const action = String(body.action || "");

    if (!id || action !== "cancel") {
      return NextResponse.json({ error: "طلب غير صحيح." }, { status: 400 });
    }

    const existing = await prisma.chargeCode.findUnique({
      where: { id },
      select: { teacherId: true, status: true },
    });

    if (!existing || existing.teacherId !== user.id) {
      return NextResponse.json(
        { error: "الكود غير موجود أو غير مصرح." },
        { status: 404 },
      );
    }

    if (existing.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "فقط الأكواد النشطة يمكن إلغاؤها." },
        { status: 400 },
      );
    }

    await prisma.chargeCode.update({
      where: { id },
      data: { status: "CANCELED" },
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[teacher/charge-codes] PATCH", error);
    return NextResponse.json({ error: "حدث خطأ داخلي" }, { status: 500 });
  }
}
