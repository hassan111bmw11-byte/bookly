"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";
import PageTitle from "@/components/shared/PageTitle";
import { teacherNavItems } from "@/data/platform";
import ChatPanel from "@/components/teacher/ChatPanel";

export default function Page() {
  return (
    <DashboardLayout title="لوحة المعلم" items={teacherNavItems}>
      <PageTitle title="شات الطلاب" />
      <ChatPanel />
    </DashboardLayout>
  );
}
