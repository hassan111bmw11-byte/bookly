"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";
import PageTitle from "@/components/shared/PageTitle";
import { teacherNavItems } from "@/data/platform";
import LectureForm from "@/components/teacher/LectureForm";

export default function Page() {
  return (
    <DashboardLayout title="لوحة المعلم" items={teacherNavItems}>
      <PageTitle title="إدارة المحاضرات" />
      <LectureForm />
    </DashboardLayout>
  );
}
