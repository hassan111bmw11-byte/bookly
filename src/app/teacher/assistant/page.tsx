"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";
import PageTitle from "@/components/shared/PageTitle";
import { teacherNavItems } from "@/data/platform";
import AssistantPanel from "@/components/teacher/AssistantPanel";

export default function Page() {
  return (
    <DashboardLayout title="لوحة المعلم" items={teacherNavItems}>
      <PageTitle title="المساعد الذكي" />
      <AssistantPanel />
    </DashboardLayout>
  );
}
