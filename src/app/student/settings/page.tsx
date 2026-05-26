"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";
import PageTitle from "@/components/shared/PageTitle";
import StudentPlaceholder from "@/components/student/StudentPlaceholder";
import { studentNavItems } from "@/data/platform";
import { Settings } from "lucide-react";

export default function Page() {
  return (
    <DashboardLayout title="لوحة الطالب" items={studentNavItems}>
      <PageTitle title="الإعدادات" />
      <StudentPlaceholder icon={Settings} title="الإعدادات" />
    </DashboardLayout>
  );
}
