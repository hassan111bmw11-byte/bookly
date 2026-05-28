import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const lectures = await prisma.lecture.count();
    const exams = await prisma.exam.count();
    const files = await prisma.fileResource.count();
    const assignments = await prisma.assignment.count();
    const teachers = await prisma.user.count({ where: { role: "TEACHER" } });
    const students = await prisma.user.count({ where: { role: "STUDENT" } });

    return NextResponse.json(
      {
        features: [
          {
            key: "lectures",
            title: "محاضرات فيديو HD",
            desc: "شرح كامل لأبواب المنهج بجودة عالية.",
            value: lectures,
          },
          {
            key: "exams",
            title: "اختبارات تفاعلية",
            desc: "اختبارات بوقت وتصحيح فوري.",
            value: exams,
          },
          {
            key: "files",
            title: "ملفات ومذكرات",
            desc: "مذكرات ومراجعات ونماذج شاملة.",
            value: files,
          },
          {
            key: "assignments",
            title: "واجبات منظمة",
            desc: "حل وتسليم الواجبات بسهولة.",
            value: assignments,
          },
          {
            key: "community",
            title: "متابعة مستمرة",
            desc: `${students} طالب و ${teachers} مدرس على المنصة.`,
            value: students,
          },
          {
            key: "assistant",
            title: "مساعد ذكي",
            desc: "مساعد فيزياء يشرح الأسئلة ويبسط الأفكار.",
            value: 1,
          },
        ],
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[landing/summary]", error);
    return NextResponse.json({ error: "حدث خطأ داخلي" }, { status: 500 });
  }
}
