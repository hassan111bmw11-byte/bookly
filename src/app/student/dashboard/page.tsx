"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";
import PageTitle from "@/components/shared/PageTitle";
import StudentDashboard from "@/components/student/StudentDashboard";
import { studentNavItems } from "@/data/platform";

export default function Page() {
  return (
    <DashboardLayout title="لوحة الطالب" items={studentNavItems}>
      <PageTitle title="لوحة الطالب" />
      <StudentDashboard />
    </DashboardLayout>
  );
}
