"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import PageTitle from "@/components/shared/PageTitle";
import Card from "@/components/ui/Card";
import { ClipboardCheck } from "lucide-react";
import { studentNavItems } from "@/data/platform";

type Assignment = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  teacher: {
    name: string;
  };
};

export default function Page() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssignments() {
      try {
        const response = await fetch("/api/student/assignments");
        const data = await response.json();
        if (response.ok) {
          setAssignments(data.assignments);
        }
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAssignments();
  }, []);

  return (
    <DashboardLayout title="لوحة الطالب" items={studentNavItems}>
      <PageTitle title="الواجبات" />
      <div className="space-y-4">
        {loading ?
          <Card>
            <p className="text-slate-500">جاري تحميل الواجبات...</p>
          </Card>
        : assignments.length === 0 ?
          <Card>
            <p className="text-center text-slate-500">لا توجد واجبات حالياً</p>
          </Card>
        : <div className="grid gap-4">
            {assignments.map((assignment) => (
              <Card key={assignment.id}>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold">
                      {assignment.title}
                    </h3>
                    <span className="rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-xs">
                      {assignment.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {assignment.description}
                  </p>
                  <div className="flex flex-col gap-1 text-sm text-slate-500">
                    <span>المعلم: {assignment.teacher.name}</span>
                    <span>
                      موعد التسليم:{" "}
                      {new Date(assignment.dueDate).toLocaleDateString(
                        "ar-EG",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
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
