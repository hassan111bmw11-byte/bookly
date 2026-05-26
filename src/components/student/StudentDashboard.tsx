"use client";

import { useEffect, useState } from "react";
import { BookOpen, ClipboardCheck, Trophy, Wallet } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";

type Stats = {
  lectures: number;
  assignments: number;
  exams: number;
  wallet: number;
};

type Lecture = {
  id: number;
  title: string;
  description: string;
  teacher: {
    name: string;
  };
};

export default function StudentDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [lastLecture, setLastLecture] = useState<Lecture | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, lecturesRes] = await Promise.all([
          fetch("/api/student/stats"),
          fetch("/api/student/lectures"),
        ]);

        const statsData = await statsRes.json();
        const lecturesData = await lecturesRes.json();

        if (statsRes.ok) {
          setStats(statsData.stats);
        }
        if (lecturesRes.ok && lecturesData.lectures.length > 0) {
          setLastLecture(lecturesData.lectures[0]);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-24 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"
            />
          ))}
        </div>
        <div className="h-40 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          label="رصيد المحفظة"
          value={`${stats?.wallet || 0} ج`}
          icon={Wallet}
        />
        <StatCard
          label="محاضرات متاحة"
          value={stats?.lectures.toString() || "0"}
          icon={BookOpen}
        />
        <StatCard
          label="واجبات"
          value={stats?.assignments.toString() || "0"}
          icon={ClipboardCheck}
        />
        <StatCard
          label="اختبارات"
          value={stats?.exams.toString() || "0"}
          icon={Trophy}
        />
      </div>
      {lastLecture && (
        <Card>
          <h2 className="text-xl font-black">آخر محاضرة</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            {lastLecture.title}
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            من {lastLecture.teacher.name}
          </p>
        </Card>
      )}
      {!lastLecture && (
        <Card>
          <h2 className="text-xl font-black">لا توجد محاضرات</h2>
          <p className="mt-2 text-slate-400">
            لم يتم إضافة أي محاضرات حتى الآن
          </p>
        </Card>
      )}
    </div>
  );
}
