"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  text: string;
  type: ToastType;
}

interface ToastItemProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

const typeStyles: Record<ToastType, string> = {
  success: "bg-[rgb(var(--color-secondary))] text-white",
  error: "bg-red-500 text-white",
  info: "bg-[rgb(var(--color-primary))] text-white",
};

function ToastItem({ toast, onClose }: ToastItemProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg",
        "animate-fade-in-up text-sm font-medium",
        typeStyles[toast.type]
      )}
    >
      <span>{toast.text}</span>
      <button
        onClick={() => onClose(toast.id)}
        className="ml-auto opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Zamknij"
      >
        ✕
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onClose={onClose} />
      ))}
    </div>
  );
}

/** Hook do zarządzania toastami */
export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (text: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, text, type }]);
  };

  const closeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, showToast, closeToast };
}
