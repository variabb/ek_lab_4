"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { stations } from "@/data/stations";

type Station = (typeof stations)[number];

interface ChartsPanelProps {
  station: Station | null;
}

const pieColors = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"];

export default function ChartsPanel({ station }: ChartsPanelProps) {
  if (!station) {
    return (
      <div className="rounded-xl border p-4">
        <h2 className="mb-2 text-lg font-semibold">Графіки</h2>
        <p>Оберіть станцію на карті, щоб побачити графіки.</p>
      </div>
    );
  }

  const barData = stations.map((item) => ({
    name: item.city,
    AQI: item.currentAQI,
  }));

  const pieData = [
    { name: "PM2.5", value: station.pollutants.PM25 },
    { name: "PM10", value: station.pollutants.PM10 },
    { name: "NO2", value: station.pollutants.NO2 },
    { name: "SO2", value: station.pollutants.SO2 },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border p-4">
        <h2 className="mb-4 text-lg font-semibold">
          Динаміка AQI: {station.name}
        </h2>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={station.history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="aqi" name="AQI" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border p-4">
        <h2 className="mb-4 text-lg font-semibold">
          Порівняння станцій за AQI
        </h2>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="AQI" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border p-4">
        <h2 className="mb-4 text-lg font-semibold">
          Структура забруднення: {station.name}
        </h2>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={pieColors[index % pieColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
