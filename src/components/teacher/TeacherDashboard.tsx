"use client";

import { useEffect, useState } from "react";
import { Users, Video, ClipboardCheck, Ticket } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import DashboardHero from "./DashboardHero";
import TeacherTools from "./TeacherTools";

type Stats = {
  lectures: number;
  assignments: number;
  exams: number;
  students: number;
  totalCodes: number;
  unusedCodes: number;
  usedCodes: number;
  canceledCodes: number;
};

export default function TeacherDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/teacher/stats");
        const data = await response.json();
        if (response.ok) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const teacherStats =
    stats ?
      [
        {
          label: "مجموع الأكواد",
          value: stats.totalCodes.toString(),
          icon: Ticket,
          color: "from-violet-500 to-indigo-500",
        },
        {
          label: "غير مستخدمة",
          value: stats.unusedCodes.toString(),
          icon: Ticket,
          color: "from-emerald-500 to-teal-400",
        },
        {
          label: "مستخدمة",
          value: stats.usedCodes.toString(),
          icon: Ticket,
          color: "from-cyan-500 to-blue-500",
        },
        {
          label: "ملغاة",
          value: stats.canceledCodes.toString(),
          icon: Ticket,
          color: "from-rose-500 to-red-500",
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="space-y-6">
        <DashboardHero />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHero />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {teacherStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
      <TeacherTools />
    </div>
  );
}
