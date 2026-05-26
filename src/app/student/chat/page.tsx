"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";
import PageTitle from "@/components/shared/PageTitle";
import StudentPlaceholder from "@/components/student/StudentPlaceholder";
import { studentNavItems } from "@/data/platform";
import { MessageCircle } from "lucide-react";

export default function Page() {
  return (
    <DashboardLayout title="لوحة الطالب" items={studentNavItems}>
      <PageTitle title="الشات" />
      <StudentPlaceholder icon={MessageCircle} title="الشات" />
    </DashboardLayout>
  );
}
