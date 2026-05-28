"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/shared/ToastProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import Input from "@/components/ui/Input";

export default function LoginPage() {
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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      setError("الرجاء إدخال البريد الإلكتروني وكلمة المرور.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      mode: "same-origin",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await parseJSON(res);
    setLoading(false);

    if (!res.ok) {
      const msg = data?.error || "خطأ في بيانات الدخول.";
      setError(msg);
      toast.show(msg, "error");
      return;
    }

    if (!data?.user) {
      const msg = "حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.";
      setError(msg);
      toast.show(msg, "error");
      return;
    }

    const target =
      data.user.role === "TEACHER" ?
        "/teacher/dashboard"
      : "/student/dashboard";
    window.location.replace(target);
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

  // Redirect away from login if already authenticated
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
      title="تسجيل الدخول"
      subtitle="ادخل بياناتك للوصول لحسابك"
      sideTitle="أهلًا بعودتك"
      sideSubtitle="سجل دخولك وكمل رحلتك في إتقان الفيزياء."
    >
      <form onSubmit={handleLogin} className="space-y-5">
        <Input label="البريد الإلكتروني" name="email" type="email" required />

        <Input label="كلمة المرور" name="password" type="password" required />

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-2xl bg-gradient-to-l from-cyan-400 to-indigo-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-500/20 transition ${
            loading ? "cursor-not-allowed opacity-70" : "hover:-translate-y-0.5"
          }`}
        >
          {loading ? "جاري الدخول..." : "دخول"}
        </button>

        {error ?
          <p className="text-center text-sm text-red-500">{error}</p>
        : null}

        <p className="text-center text-sm text-slate-500">
          مالكش حساب؟{" "}
          <Link href="/register" className="font-black text-indigo-400">
            سجل كطالب جديد
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
