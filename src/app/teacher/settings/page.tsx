"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";
import PageTitle from "@/components/shared/PageTitle";
import { teacherNavItems } from "@/data/platform";
import TeacherSettingsForm from "@/components/teacher/TeacherSettingsForm";

export default function Page() {
  return (
    <DashboardLayout title="لوحة المعلم" items={teacherNavItems}>
      <PageTitle title="إعدادات المنصة" />
      <TeacherSettingsForm />
    </DashboardLayout>
  );
}
