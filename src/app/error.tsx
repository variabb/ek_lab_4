"use client";

import { useEffect } from "react";
import { logError } from "@/lib/logger";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logError("Global UI error captured", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <html lang="uk">
      <body className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-xl rounded-2xl border bg-white p-8 shadow-sm">
          <h1 className="mb-4 text-2xl font-bold text-red-600">
            Сталася помилка
          </h1>

          <p className="mb-3 text-slate-700">
            Під час роботи інтерфейсу виникла неочікувана помилка.
          </p>

          <p className="mb-6 text-sm text-slate-500">
            Спробуйте оновити сторінку або повторити дію ще раз.
          </p>

          <button
            onClick={() => reset()}
            className="rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700"
          >
            Спробувати знову
          </button>
        </div>
      </body>
    </html>
  );
}
