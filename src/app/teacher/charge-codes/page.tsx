"use client";

import DashboardLayout from "@/components/shared/DashboardLayout";
import PageTitle from "@/components/shared/PageTitle";
import { teacherNavItems } from "@/data/platform";
import ChargeCodesPanel from "@/components/teacher/ChargeCodesPanel";

export default function Page() {
  return (
    <DashboardLayout title="لوحة المعلم" items={teacherNavItems}>
      <PageTitle title="أكواد الشحن" />
      <ChargeCodesPanel />
    </DashboardLayout>
  );
}
