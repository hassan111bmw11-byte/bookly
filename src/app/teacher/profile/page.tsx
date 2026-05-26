"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";
import PageTitle from "@/components/shared/PageTitle";
import { teacherNavItems } from "@/data/platform";
import TeacherProfileForm from "@/components/teacher/TeacherProfileForm";

export default function Page() {
  return (
    <DashboardLayout title="لوحة المعلم" items={teacherNavItems}>
      <PageTitle title="الملف الشخصي" />
      <TeacherProfileForm />
    </DashboardLayout>
  );
}
