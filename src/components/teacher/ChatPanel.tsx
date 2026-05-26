import { MessageCircle } from "lucide-react";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import SearchInput from "@/components/ui/SearchInput";

export default function ChatPanel() {
  return (
    <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
      <Card>
        <SearchInput placeholder="ابحث عن طالب..." />
        <p className="mt-10 text-center text-sm text-slate-500">لا توجد محادثات</p>
      </Card>
      <EmptyState icon={MessageCircle} title="اختر طالبًا لبدء المحادثة" />
    </div>
  );
}
