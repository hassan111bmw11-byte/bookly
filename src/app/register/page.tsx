"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/shared/ToastProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function RegisterPage() {
  const router = useRouter();
  const toast = useToast();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const parseJSON = async (res: Response) => {
    const text = await res.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const guardianPhone = String(formData.get("guardianPhone") || "").trim();
    const password = String(formData.get("password") || "");

    if (!name || !email || !phone || !password) {
      setError("الرجاء ملء جميع الحقول المطلوبة.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, phone, guardianPhone, password }),
    });

    const data = await parseJSON(res);
    setLoading(false);

    if (!res.ok) {
      const msg = data?.error || "حدث خطأ أثناء التسجيل.";
      setError(msg);
      toast.show(msg, "error");
      return;
    }

    // save email so user doesn't retype next time
    try {
      localStorage.setItem("signup_email", email);
    } catch {}

    toast.show("تم إنشاء الحساب بنجاح", "success");
    router.replace("/student/dashboard");
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("signup_email");
      if (saved) {
        const el = document.querySelector(
          'input[name="email"]',
        ) as HTMLInputElement | null;
        if (el) el.value = saved;
      }
    } catch {}
  }, []);

  // Redirect away from register if already authenticated
  useEffect(() => {
    let mounted = true;
    async function check() {
      try {
        const res = await fetch("/api/auth/me");
        if (!mounted) return;
        const data = await res.json();
        if (res.ok && data?.user) {
          router.replace(
            data.user.role === "TEACHER" ?
              "/teacher/dashboard"
            : "/student/dashboard",
          );
        }
      } catch (e) {
        // ignore
      }
    }
    check();
    return () => {
      mounted = false;
    };
  }, [router]);

  return (
    <AuthShell
      title="تسجيل حساب طالب جديد"
      subtitle="املأ بياناتك للبدء على المنصة"
      sideTitle="انضم لرحلة التفوق"
      sideSubtitle="سجل حسابك واستمتع بمحاضرات واختبارات وملفات الفيزياء كاملة."
    >
      <form onSubmit={handleRegister} className="space-y-5 w-100">
        <Input label="الاسم بالكامل" name="name" required />
        <Input label="البريد الإلكتروني" name="email" type="email" required />

        <div className="grid gap-4 md:grid-cols-2">
          <Input label="رقم الهاتف" name="phone" required />
          <Input label="رقم ولي الأمر" name="guardianPhone" />
        </div>

        <Input label="كلمة المرور" name="password" type="password" required />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
        </Button>

        {error ?
          <p className="text-center text-sm text-red-500">{error}</p>
        : null}

        <p className="text-center text-sm text-slate-500">
          عندك حساب بالفعل؟{" "}
          <Link href="/login" className="font-black text-indigo-400">
            سجل دخول
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
