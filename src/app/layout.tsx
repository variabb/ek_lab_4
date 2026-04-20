import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Eco Monitoring App",
  description: "Environmental monitoring dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <link rel="preconnect" href="https://a.tile.openstreetmap.org" />
        <link rel="preconnect" href="https://b.tile.openstreetmap.org" />
        <link rel="preconnect" href="https://c.tile.openstreetmap.org" />
      </head>
      <body>
        {children}
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
      </body>
    </html>
  );
}
