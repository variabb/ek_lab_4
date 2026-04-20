"use client";

import dynamic from "next/dynamic";
import { stations } from "@/data/stations";

type Station = (typeof stations)[number];

interface ChartsPanelProps {
  station: Station | null;
}

const ChartsContent = dynamic(() => import("./ChartsContent"), {
  ssr: false,
  loading: () => (
    <div className="rounded-xl border p-4">
      <h2 className="mb-2 text-lg font-semibold">Графіки</h2>
      <div className="flex h-[320px] items-center justify-center text-slate-500">
        Завантаження графіків...
      </div>
    </div>
  ),
});

export default function ChartsPanel({ station }: ChartsPanelProps) {
  if (!station) {
    return (
      <div className="rounded-xl border p-4">
        <h2 className="mb-2 text-lg font-semibold">Графіки</h2>
        <div className="flex h-[320px] items-center justify-center text-slate-500">
          Оберіть станцію на карті, щоб побачити графіки.
        </div>
      </div>
    );
  }

  return <ChartsContent station={station} />;
}
