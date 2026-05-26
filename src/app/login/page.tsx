"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import Input from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await parseJSON(res);
    setLoading(false);

    if (!res.ok) {
      setError(data?.error || "خطأ في بيانات الدخول.");
      return;
    }

    if (!data?.user) {
      setError("حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.");
      return;
    }

    router.push(
      data.user.role === "TEACHER"
        ? "/teacher/dashboard"
        : "/student/dashboard",
    );
  };

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

        {error ? (
          <p className="text-center text-sm text-red-500">{error}</p>
        ) : null}

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
