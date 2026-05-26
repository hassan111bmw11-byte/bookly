import {
  Bot,
  ClipboardCheck,
  FileText,
  MessageCircle,
  Settings,
  Ticket,
  Users,
  Video,
} from "lucide-react";
import Card from "@/components/ui/Card";

const tools = [
  { title: "الاختبارات", icon: ClipboardCheck },
  { title: "المحاضرات", icon: Video },
  { title: "الطلاب والمستخدمين", icon: Users },
  { title: "الشات مع الطلاب", icon: MessageCircle },
  { title: "المساعد الذكي", icon: Bot },
  { title: "أكواد الشحن", icon: Ticket },
  { title: "إعدادات المنصة", icon: Settings },
  { title: "الملفات والمذكرات", icon: FileText },
];

export default function TeacherTools() {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-black">الأدوات</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {tools.map(({ title, icon: Icon }) => (
          <Card key={title} className="text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-white">
              <Icon />
            </div>
            <p className="mt-4 font-black">{title}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
