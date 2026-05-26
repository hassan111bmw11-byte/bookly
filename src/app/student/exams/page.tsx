"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import PageTitle from "@/components/shared/PageTitle";
import Card from "@/components/ui/Card";
import { Trophy } from "lucide-react";
import { studentNavItems } from "@/data/platform";

type Exam = {
  id: number;
  title: string;
  description: string;
  date: string;
  type: string;
  teacher: {
    name: string;
  };
};

const typeLabels: Record<string, string> = {
  QUIZ: "اختبار قصير",
  MIDTERM: "نصف الفصل",
  FINAL: "نهائي",
};

export default function Page() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExams() {
      try {
        const response = await fetch("/api/student/exams");
        const data = await response.json();
        if (response.ok) {
          setExams(data.exams);
        }
      } catch (error) {
        console.error("Failed to fetch exams:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExams();
  }, []);

  return (
    <DashboardLayout title="لوحة الطالب" items={studentNavItems}>
      <PageTitle title="الاختبارات" />
      <div className="space-y-4">
        {loading ?
          <Card>
            <p className="text-slate-500">جاري تحميل الاختبارات...</p>
          </Card>
        : exams.length === 0 ?
          <Card>
            <p className="text-center text-slate-500">
              لا توجد اختبارات حالياً
            </p>
          </Card>
        : <div className="grid gap-4">
            {exams.map((exam) => (
              <Card key={exam.id}>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold">{exam.title}</h3>
                    <span className="rounded-full bg-slate-100 text-slate-800 px-3 py-1 text-xs">
                      {typeLabels[exam.type] || exam.type}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {exam.description}
                  </p>
                  <div className="flex flex-col gap-1 text-sm text-slate-500">
                    <span>المعلم: {exam.teacher.name}</span>
                    <span>
                      التاريخ:{" "}
                      {new Date(exam.date).toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        }
      </div>
    </DashboardLayout>
  );
}
