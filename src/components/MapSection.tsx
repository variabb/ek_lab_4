"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { stations } from "@/data/stations";
import ChartsPanel from "./ChartsPanel";
import { trackEvent } from "@/lib/analytics";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
});

type Station = (typeof stations)[number];
type FilterValue = "all" | "low" | "medium" | "high";

export default function MapSection() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [filter, setFilter] = useState<FilterValue>("all");

  const filteredStations = useMemo(() => {
    if (filter === "all") {
      return stations;
    }

    return stations.filter((station) => station.pollutionLevel === filter);
  }, [filter]);

  useEffect(() => {
    if (!selectedStation) return;

    trackEvent("view_station_details", {
      station_name: selectedStation.name,
      city: selectedStation.city,
      pollution_level: selectedStation.pollutionLevel,
      current_aqi: selectedStation.currentAQI,
    });

    trackEvent("view_charts", {
      station_name: selectedStation.name,
    });
  }, [selectedStation]);

  const handleFilterChange = (nextFilter: FilterValue) => {
    setFilter(nextFilter);

    trackEvent("apply_station_filter", {
      filter_level: nextFilter,
    });

    if (
      selectedStation &&
      nextFilter !== "all" &&
      selectedStation.pollutionLevel !== nextFilter
    ) {
      setSelectedStation(null);
    }
  };

  const handleResetSelection = () => {
    setSelectedStation(null);

    trackEvent("reset_station_selection", {
      action: "clear_selected_station",
    });
  };

  const handleExportData = () => {
    const dataToExport = selectedStation ? [selectedStation] : filteredStations;

    const json = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = selectedStation
      ? `${selectedStation.name}-data.json`
      : "stations-data.json";
    link.click();

    URL.revokeObjectURL(url);

    trackEvent("export_data", {
      export_type: "json",
      selected_station: selectedStation?.name ?? "none",
      records_count: dataToExport.length,
    });
  };
  useEffect(() => {
    const start = performance.now();

    window.addEventListener("load", () => {
      const loadTime = performance.now() - start;

      trackEvent("page_load_time", {
        load_time_ms: Math.round(loadTime),
      });
    });
  }, []);
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="rounded-xl border p-4">
          <label className="mb-2 block text-sm font-medium">
            Фільтр за рівнем забруднення
          </label>

          <select
            value={filter}
            onChange={(event) =>
              handleFilterChange(event.target.value as FilterValue)
            }
            className="w-full rounded-lg border px-3 py-2 outline-none"
          >
            <option value="all">Усі станції</option>
            <option value="low">Низький рівень</option>
            <option value="medium">Середній рівень</option>
            <option value="high">Високий рівень</option>
          </select>
        </div>

        <MapView
          stationsToShow={filteredStations}
          selectedStation={selectedStation}
          onSelectStation={setSelectedStation}
        />

        <div className="space-y-3 rounded-xl border p-4">
          {selectedStation ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Обрана станція:{" "}
                <span className="font-semibold">{selectedStation.name}</span>
              </p>

              <button
                onClick={handleResetSelection}
                className="rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700"
              >
                Скинути вибір
              </button>
            </div>
          ) : (
            <p>Оберіть станцію на карті.</p>
          )}

          <button
            onClick={handleExportData}
            className="rounded-lg border px-4 py-2 transition hover:bg-slate-100"
          >
            Експорт даних
          </button>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="mb-3 text-base font-semibold">Легенда карти</h3>

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-green-600"></span>
              <span>Низький рівень забруднення</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-amber-500"></span>
              <span>Середній рівень забруднення</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-red-600"></span>
              <span>Високий рівень забруднення</span>
            </div>
          </div>
        </div>
      </div>

      <ChartsPanel station={selectedStation} />
    </div>
  );
}
