import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/data/platform";
import Button from "@/components/ui/Button";

export default function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="px-5 py-24 bg-slate-50 text-center dark:bg-[#02040f]"
    >
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white/90 p-10 shadow-2xl shadow-slate-200/20 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-3xl font-black md:text-4xl">عندك سؤال؟ تواصل معنا</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
          فريقنا جاهز للرد على استفساراتك بسرعة ويهتم بكل تفاصيل الاشتراك والدخول للموقع.
        </p>
        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
          <Button variant="success" className="mt-8 w-full justify-center sm:w-auto">
            <MessageCircle size={22} />
            تواصل واتساب
          </Button>
        </a>
      </div>
    </motion.section>
  );
}
