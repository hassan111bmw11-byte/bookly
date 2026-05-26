"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { Upload, Trash2 } from "lucide-react";

type Lecture = {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  createdAt: string;
};

export default function LectureForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
  });
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLectures();
  }, []);

  async function fetchLectures() {
    try {
      const response = await fetch("/api/teacher/lectures");
      const data = await response.json();
      if (response.ok) {
        setLectures(data.lectures);
      }
    } catch (error) {
      console.error("Failed to fetch lectures:", error);
    } finally {
      setFetching(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/teacher/lectures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setFormData({ title: "", description: "", videoUrl: "" });
        fetchLectures();
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("فشل في إضافة المحاضرة");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="mb-6 text-xl font-black">محاضرة جديدة</h2>
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
            <Input
              label="رابط الفيديو"
              value={formData.videoUrl}
              onChange={(e) =>
                setFormData({ ...formData, videoUrl: e.target.value })
              }
              placeholder="https://..."
              required
            />
          </div>
          <Textarea
            label="الوصف"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? "جاري الإضافة..." : "إضافة محاضرة"}
          </Button>
        </form>
      </Card>

      <Card>
        <h2 className="mb-6 text-xl font-black">
          المحاضرات ({lectures.length})
        </h2>
        {fetching ?
          <p className="text-slate-500">جاري التحميل...</p>
        : lectures.length === 0 ?
          <p className="text-slate-500">لم يتم إضافة محاضرات بعد</p>
        : <div className="space-y-3">
            {lectures.map((lecture) => (
              <div
                key={lecture.id}
                className="flex items-start justify-between rounded-lg border border-slate-200 dark:border-slate-700 p-4"
              >
                <div className="flex-1">
                  <h3 className="font-semibold">{lecture.title}</h3>
                  <p className="text-sm text-slate-500">
                    {lecture.description}
                  </p>
                  <a
                    href={lecture.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    رابط الفيديو
                  </a>
                </div>
              </div>
            ))}
          </div>
        }
      </Card>
    </div>
  );
}
