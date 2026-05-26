"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

type Exam = {
  id: number;
  title: string;
  description: string;
  date: string;
  type: string;
  createdAt: string;
};

export default function ExamForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    type: "QUIZ",
  });
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchExams();
  }, []);

  async function fetchExams() {
    try {
      const response = await fetch("/api/teacher/exams");
      const data = await response.json();
      if (response.ok) {
        setExams(data.exams);
      }
    } catch (error) {
      console.error("Failed to fetch exams:", error);
    } finally {
      setFetching(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/teacher/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setFormData({ title: "", description: "", date: "", type: "QUIZ" });
        fetchExams();
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("فشل في إضافة الاختبار");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const typeLabels: Record<string, string> = {
    QUIZ: "اختبار قصير",
    MIDTERM: "اختبار نصف الفصل",
    FINAL: "الاختبار النهائي",
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="mb-6 text-xl font-black">اختبار جديد</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="العنوان"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <div>
              <label className="text-sm font-medium">نوع الاختبار</label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="mt-2 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2"
              >
                <option value="QUIZ">اختبار قصير</option>
                <option value="MIDTERM">نصف الفصل</option>
                <option value="FINAL">النهائي</option>
              </select>
            </div>
          </div>
          <Textarea
            label="الوصف"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <Input
            label="التاريخ والوقت"
            type="datetime-local"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? "جاري الإضافة..." : "إضافة اختبار"}
          </Button>
        </form>
      </Card>

      <Card>
        <h2 className="mb-6 text-xl font-black">الاختبارات ({exams.length})</h2>
        {fetching ?
          <p className="text-slate-500">جاري التحميل...</p>
        : exams.length === 0 ?
          <p className="text-slate-500">لم يتم إضافة اختبارات بعد</p>
        : <div className="space-y-3">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="rounded-lg border border-slate-200 dark:border-slate-700 p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{exam.title}</h3>
                    <p className="text-sm text-slate-500">{exam.description}</p>
                  </div>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded-full">
                    {typeLabels[exam.type] || exam.type}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                  التاريخ:{" "}
                  {new Date(exam.date).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        }
      </Card>
    </div>
  );
}
