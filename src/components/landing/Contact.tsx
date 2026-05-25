import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/data/landing";

export default function Contact() {
  return (
    <section id="contact" className="px-5 py-24 text-center">
      <h2 className="text-3xl font-black md:text-4xl">عندك سؤال؟ تواصل معنا</h2>

      <p className="mt-4 text-slate-600 dark:text-slate-400">
        فريقنا جاهز للرد على استفساراتك.
      </p>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-7 py-4 font-black text-white"
      >
        <MessageCircle size={22} />
        تواصل واتساب
      </a>
    </section>
  );
}
