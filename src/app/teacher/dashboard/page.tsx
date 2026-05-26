"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";
import PageTitle from "@/components/shared/PageTitle";
import { teacherNavItems } from "@/data/platform";
import TeacherDashboard from "@/components/teacher/TeacherDashboard";

export default function Page() {
  return (
    <DashboardLayout title="لوحة المعلم" items={teacherNavItems}>
      <PageTitle title="الرئيسية" />
      <TeacherDashboard />
    </DashboardLayout>
  );
}
