import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-xl rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-4 text-3xl font-bold">404</h1>

        <p className="mb-3 text-lg font-semibold">Сторінку не знайдено</p>

        <p className="mb-6 text-slate-600">
          Можливо, адреса введена неправильно або сторінка була переміщена.
        </p>

        <Link
          href="/"
          className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700"
        >
          Повернутися на головну
        </Link>
      </div>
    </main>
  );
}
