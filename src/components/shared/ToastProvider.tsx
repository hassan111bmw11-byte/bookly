"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

type Toast = { id: string; message: string; type?: "error" | "success" };

const ToastContext = createContext({
  show: (msg: string, t?: "error" | "success") => {},
});

export function useToast() {
  return useContext(ToastContext) as {
    show: (msg: string, t?: "error" | "success") => void;
  };
}

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((message: string, type: Toast["type"] = "error") => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 9);
    setToasts((s) => [...s, { id, message, type }]);
    setTimeout(() => {
      setToasts((s) => s.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed left-1/2 top-6 z-50 flex -translate-x-1/2 flex-col items-center gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`max-w-md rounded-xl px-4 py-2 text-sm font-bold text-white shadow-lg ${
              t.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
