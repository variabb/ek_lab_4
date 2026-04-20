import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const start = Date.now();

  const response = NextResponse.next();

  const duration = Date.now() - start;

  const log = {
    level: "info",
    type: "request",
    method: request.method,
    url: request.nextUrl.pathname,
    userAgent: request.headers.get("user-agent"),
    timestamp: new Date().toISOString(),
    duration,
  };

  console.log(JSON.stringify(log));

  return response;
}
export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};