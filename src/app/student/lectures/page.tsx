"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";
import PageTitle from "@/components/shared/PageTitle";
import { studentNavItems } from "@/data/platform";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";

type Lecture = {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  teacher: {
    name: string;
  };
  createdAt: string;
};

export default function Page() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLectures() {
      try {
        const response = await fetch("/api/student/lectures");
        const data = await response.json();
        if (response.ok) {
          setLectures(data.lectures);
        }
      } catch (error) {
        console.error("Failed to fetch lectures:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLectures();
  }, []);

  return (
    <DashboardLayout title="لوحة الطالب" items={studentNavItems}>
      <PageTitle title="المحاضرات" />
      <div className="space-y-4">
        {loading ?
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-40 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"
              />
            ))}
          </div>
        : lectures.length === 0 ?
          <Card>
            <p className="text-center text-slate-500">لا توجد محاضرات حالياً</p>
          </Card>
        : <div className="grid gap-4 md:grid-cols-2">
            {lectures.map((lecture) => (
              <Card key={lecture.id}>
                <h3 className="font-semibold text-lg">{lecture.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  {lecture.description}
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  من {lecture.teacher.name}
                </p>
                <a
                  href={lecture.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-blue-500 hover:text-blue-700"
                >
                  <BookOpen size={16} />
                  فتح المحاضرة
                </a>
              </Card>
            ))}
          </div>
        }
      </div>
    </DashboardLayout>
  );
}
