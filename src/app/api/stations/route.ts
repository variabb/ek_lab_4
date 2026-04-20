import { NextRequest, NextResponse } from "next/server";
import { stations } from "@/data/stations";
import { logDebug, logError, logInfo, logWarn } from "@/lib/logger";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode");

  logInfo("Stations endpoint called", {
    route: "/api/stations",
    method: "GET",
    mode,
  });

  try {
    if (mode === "debug") {
      logDebug("Debug mode enabled for stations endpoint", {
        query: Object.fromEntries(searchParams.entries()),
      });
    }

    if (mode === "warn") {
      logWarn("Suspicious request mode detected", {
        mode,
      });
    }

    if (mode === "error") {
      throw new Error("Simulated server error while fetching stations");
    }

    return NextResponse.json({
      success: true,
      data: stations,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown server error";

    logError("Failed to fetch stations", {
      route: "/api/stations",
      method: "GET",
      errorMessage: message,
      mode,
    });

    return NextResponse.json(
      {
        success: false,
        message: "Не вдалося отримати дані станцій. Спробуйте пізніше.",
      },
      { status: 500 },
    );
  }
}
