import type { ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import FloatingWhatsapp from "./FloatingWhatsapp";
import type { NavItem } from "@/data/platform";

type Props = {
  title: string;
  role?: "teacher" | "student";
  children: ReactNode;
  items?: NavItem[];
};

export default function DashboardLayout({
  title,
  role,
  children,
  items,
}: Props) {
  const resolvedRole =
    role ?? (items?.[0]?.href?.startsWith("/teacher/") ? "teacher" : "student");

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-950 dark:bg-[#070914] dark:text-white"
    >
      <DashboardSidebar role={resolvedRole} />

      <section className="min-h-screen lg:mr-72">
        <DashboardHeader title={title} />
        <div className="p-5 md:p-8">{children}</div>
      </section>

      <FloatingWhatsapp />
    </main>
  );
}
