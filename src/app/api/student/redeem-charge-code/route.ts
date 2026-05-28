import { cookies } from "next/headers";
import { NextResponse } from "next/server";
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

export async function POST(request: Request) {
  try {
    const user = await getUserFromCookie();
    if (!user || user.role !== "STUDENT") {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }

    const body = await request.json();
    const code = String(body.code || "")
      .trim()
      .toUpperCase();

    if (!code) {
      return NextResponse.json(
        { error: "يرجى إدخال كود صالح." },
        { status: 400 },
      );
    }

    const chargeCode = await prisma.chargeCode.findUnique({
      where: { code },
      select: {
        id: true,
        amount: true,
        status: true,
        expiresAt: true,
      },
    });

    if (!chargeCode) {
      return NextResponse.json({ error: "الكود غير موجود." }, { status: 404 });
    }

    if (chargeCode.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "هذا الكود غير قابل للاستخدام." },
        { status: 400 },
      );
    }

    if (new Date(chargeCode.expiresAt) < new Date()) {
      await prisma.chargeCode.update({
        where: { id: chargeCode.id },
        data: { status: "CANCELED" },
      });
      return NextResponse.json(
        { error: "انتهت صلاحية الكود." },
        { status: 400 },
      );
    }

    await prisma.$transaction([
      prisma.chargeCode.update({
        where: { id: chargeCode.id },
        data: { status: "USED" },
      }),
      prisma.chargeCodeUsage.create({
        data: {
          chargeCodeId: chargeCode.id,
          userId: user.id,
          amount: chargeCode.amount,
        },
      }),
      prisma.walletTransaction.create({
        data: {
          userId: user.id,
          amount: chargeCode.amount,
          type: "CREDIT",
          description: `تفعيل كود شحن ${code}`,
        },
      }),
    ]);

    return NextResponse.json(
      { ok: true, amount: chargeCode.amount, code },
      { status: 200 },
    );
  } catch (error) {
    console.error("[student/redeem-charge-code] POST", error);
    return NextResponse.json({ error: "حدث خطأ داخلي" }, { status: 500 });
  }
}
