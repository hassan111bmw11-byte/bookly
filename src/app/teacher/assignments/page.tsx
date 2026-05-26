"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";
import PageTitle from "@/components/shared/PageTitle";
import { teacherNavItems } from "@/data/platform";
import AssignmentForm from "@/components/teacher/AssignmentForm";

export default function Page() {
  return (
    <DashboardLayout title="لوحة المعلم" items={teacherNavItems}>
      <PageTitle title="إدارة الواجبات" />
      <AssignmentForm />
    </DashboardLayout>
  );
}
