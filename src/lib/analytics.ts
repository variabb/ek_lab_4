declare global {
  interface Window {
    gtag?: (
      command: "event" | "config",
      targetId: string,
      config?: Record<string, string | number | boolean | undefined>,
    ) => void;
  }
}

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(eventName: string, params?: AnalyticsParams) {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", eventName, params);
}
