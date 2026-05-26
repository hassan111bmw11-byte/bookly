import { Bot } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Input from "@/components/ui/Input";

export default function AssistantPanel() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
      <Card className="min-h-[520px]">
        <EmptyState icon={Bot} title="اسألني أي سؤال عن المنهج" />
        <div className="mt-5 flex gap-3">
          <Input placeholder="اكتب سؤالك..." />
          <Button>إرسال</Button>
        </div>
      </Card>
      <Card>
        <h2 className="font-black">المحادثات السابقة</h2>
        <p className="mt-6 text-sm text-slate-400">السلام عليكم</p>
      </Card>
    </div>
  );
}
