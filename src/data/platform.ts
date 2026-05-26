import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Bot,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Home,
  LibraryBig,
  MessageCircle,
  Settings,
  Ticket,
  User,
  Users,
  Video,
  Wallet,
} from "lucide-react";

export const PLATFORM_NAME = "فهمني من غير صداع";
export const CASH_PHONE = "01097242107";
export const WHATSAPP_LINK = `https://wa.me/20${CASH_PHONE.slice(1)}`;

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const teacherNavItems: NavItem[] = [
  { href: "/teacher/dashboard", label: "الرئيسية", icon: Home },
  { href: "/teacher/lectures", label: "المحاضرات", icon: Video },
  { href: "/teacher/assignments", label: "الواجبات", icon: ClipboardCheck },
  { href: "/teacher/exams", label: "الاختبارات", icon: BookOpen },
  { href: "/teacher/files", label: "الملفات", icon: FileText },
  { href: "/teacher/students", label: "الطلاب", icon: Users },
  { href: "/teacher/charge-codes", label: "أكواد الشحن", icon: Ticket },
  { href: "/teacher/wallet", label: "محافظ الطلاب", icon: Wallet },
  { href: "/teacher/chat", label: "شات الطلاب", icon: MessageCircle },
  { href: "/teacher/assistant", label: "المساعد الذكي", icon: Bot },
  { href: "/teacher/settings", label: "الإعدادات", icon: Settings },
  { href: "/teacher/profile", label: "الملف الشخصي", icon: User },
];

export const studentNavItems: NavItem[] = [
  { href: "/student/dashboard", label: "الرئيسية", icon: Home },
  { href: "/student/lectures", label: "المحاضرات", icon: Video },
  { href: "/student/assignments", label: "الواجبات", icon: ClipboardCheck },
  { href: "/student/exams", label: "الاختبارات", icon: BookOpen },
  { href: "/student/files", label: "الملفات", icon: FileText },
  { href: "/student/wallet", label: "المحفظة", icon: Wallet },
  { href: "/student/chat", label: "الشات", icon: MessageCircle },
  { href: "/student/assistant", label: "المساعد الذكي", icon: Bot },
  { href: "/student/profile", label: "الملف الشخصي", icon: User },
  { href: "/student/settings", label: "الإعدادات", icon: Settings },
];

export const landingFeatures = [
  { title: "محاضرات فيديو HD", desc: "شرح كامل لأبواب المنهج بجودة عالية.", icon: Video },
  { title: "اختبارات تفاعلية", desc: "اختبارات بوقت وتصحيح فوري.", icon: ClipboardCheck },
  { title: "ملفات ومذكرات", desc: "مذكرات ومراجعات ونماذج شاملة.", icon: FileText },
  { title: "واجبات منظمة", desc: "حل وتسليم الواجبات بسهولة.", icon: BookOpen },
  { title: "متابعة مستمرة", desc: "تقارير أداء لكل طالب.", icon: GraduationCap },
  { title: "مساعد ذكي", desc: "مساعد فيزياء يشرح الأسئلة ويبسط الأفكار.", icon: Bot },
];

export const teacherStats = [
  { label: "الطلاب", value: "0", icon: Users, color: "from-blue-500 to-cyan-400" },
  { label: "المحاضرات", value: "0", icon: Video, color: "from-purple-500 to-fuchsia-500" },
  { label: "الاختبارات", value: "0", icon: ClipboardCheck, color: "from-rose-500 to-pink-500" },
  { label: "أكواد نشطة", value: "20", icon: Ticket, color: "from-orange-500 to-amber-400" },
];
