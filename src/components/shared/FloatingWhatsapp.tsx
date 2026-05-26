import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/data/platform";

export default function FloatingWhatsapp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 left-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-500/30"
      aria-label="WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
