import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function GET() {
  logger.info(
    {
      route: "/api/health",
      method: "GET",
    },
    "Health check request received",
  );

  return NextResponse.json({
    success: true,
    message: "API is working",
  });
}
