import type { LucideIcon } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";

type Props = {
  icon: LucideIcon;
  title: string;
};

export default function StudentPlaceholder({ icon, title }: Props) {
  return <EmptyState icon={icon} title={title} desc="سيتم ربط هذا القسم بالباك اند لاحقًا." />;
}
