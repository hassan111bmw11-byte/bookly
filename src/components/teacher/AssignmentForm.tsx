"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

type Assignment = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  createdAt: string;
};

export default function AssignmentForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAssignments();
  }, []);

  async function fetchAssignments() {
    try {
      const response = await fetch("/api/teacher/assignments");
      const data = await response.json();
      if (response.ok) {
        setAssignments(data.assignments);
      }
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    } finally {
      setFetching(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/teacher/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setFormData({ title: "", description: "", dueDate: "" });
        fetchAssignments();
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("فشل في إضافة الواجب");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="mb-6 text-xl font-black">واجب جديد</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            label="العنوان"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <Textarea
            label="الوصف"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <Input
            label="موعد التسليم"
            type="datetime-local"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.target.value })
            }
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? "جاري الإضافة..." : "إضافة واجب"}
          </Button>
        </form>
      </Card>

      <Card>
        <h2 className="mb-6 text-xl font-black">
          الواجبات ({assignments.length})
        </h2>
        {fetching ?
          <p className="text-slate-500">جاري التحميل...</p>
        : assignments.length === 0 ?
          <p className="text-slate-500">لم يتم إضافة واجبات بعد</p>
        : <div className="space-y-3">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="rounded-lg border border-slate-200 dark:border-slate-700 p-4"
              >
                <h3 className="font-semibold">{assignment.title}</h3>
                <p className="text-sm text-slate-500">
                  {assignment.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    موعد التسليم:{" "}
                    {new Date(assignment.dueDate).toLocaleDateString("ar-EG")}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      assignment.status === "PENDING" ?
                        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                      : ""
                    }`}
                  >
                    {assignment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        }
      </Card>
    </div>
  );
}
