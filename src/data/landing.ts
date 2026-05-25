import {
  BookOpen,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Sparkles,
  Video,
} from "lucide-react";

export const CASH_PHONE = "01097242107";
export const WHATSAPP_LINK = `https://wa.me/20${CASH_PHONE.slice(1)}`;

export const features = [
  {
    title: "محاضرات فيديو HD",
    desc: "شرح كامل لأبواب المنهج بجودة عالية.",
    icon: Video,
  },
  {
    title: "اختبارات تفاعلية",
    desc: "اختبارات بوقت وتصحيح فوري.",
    icon: ClipboardCheck,
  },
  {
    title: "ملفات ومذكرات",
    desc: "مذكرات ومراجعات ونماذج شاملة.",
    icon: FileText,
  },
  {
    title: "واجبات منظمة",
    desc: "حل وتسليم الواجبات بسهولة.",
    icon: BookOpen,
  },
  {
    title: "متابعة مستمرة",
    desc: "تقارير أداء لكل طالب.",
    icon: GraduationCap,
  },
  {
    title: "تصميم عصري",
    desc: "واجهة مريحة بالدارك واللايت مود.",
    icon: Sparkles,
  },
];