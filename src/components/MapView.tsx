"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { stations } from "@/data/stations";
import { trackEvent } from "@/lib/analytics";

const ukraineCenter: [number, number] = [48.3794, 31.1656];

type Station = (typeof stations)[number];

function getStationColor(level: string) {
  switch (level) {
    case "low":
      return "#16a34a";
    case "medium":
      return "#f59e0b";
    case "high":
      return "#dc2626";
    default:
      return "#2563eb";
  }
}

interface MapViewProps {
  stationsToShow: Station[];
  selectedStation: Station | null;
  onSelectStation: (station: Station) => void;
}

function MapAnalyticsTracker() {
  useMapEvents({
    zoomend(event) {
      const zoom = event.target.getZoom();

      trackEvent("map_zoom", {
        zoom_level: zoom,
      });
    },
  });

  return null;
}

export default function MapView({
  stationsToShow,
  selectedStation,
  onSelectStation,
}: MapViewProps) {
  const [hoveredStationId, setHoveredStationId] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex h-[500px] w-full items-center justify-center rounded-xl border">
        <p>Завантаження карти...</p>
      </div>
    );
  }

  return (
    <div className="h-[500px] w-full overflow-hidden rounded-xl border">
      <MapContainer
        center={ukraineCenter}
        zoom={6}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapAnalyticsTracker />

        {stationsToShow.map((station) => {
          const color = getStationColor(station.pollutionLevel);
          const isSelected = selectedStation?.id === station.id;
          const isHovered = hoveredStationId === station.id;
          const isActive = isSelected || isHovered;

          return (
            <CircleMarker
              key={station.id}
              center={[station.lat, station.lng]}
              radius={isActive ? 12 : 8}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: 0.8,
                weight: isActive ? 4 : 2,
              }}
              eventHandlers={{
                click: () => {
                  onSelectStation(station);

                  trackEvent("map_station_click", {
                    station_name: station.name,
                    city: station.city,
                    pollution_level: station.pollutionLevel,
                  });
                },
                mouseover: () => setHoveredStationId(station.id),
                mouseout: () => setHoveredStationId(null),
              }}
            >
              <Popup>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold">{station.name}</h3>
                  <p>Місто: {station.city}</p>
                  <p>Поточний AQI: {station.currentAQI}</p>
                  <p>Рівень забруднення: {station.pollutionLevel}</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
