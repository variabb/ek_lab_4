import MapSection from "@/components/MapSection";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Лабораторна робота №4</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Оптимізація та деплой продакшн-застосунку
        </h2>
        <MapSection />
      </section>
    </main>
  );
}
