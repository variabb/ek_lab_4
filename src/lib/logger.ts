import pino from "pino";

export const logger = pino({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  base: {
    service: "eco-monitoring-app",
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export function logInfo(message: string, context?: Record<string, unknown>) {
  logger.info(context ?? {}, message);
}

export function logWarn(message: string, context?: Record<string, unknown>) {
  logger.warn(context ?? {}, message);
}

export function logError(message: string, context?: Record<string, unknown>) {
  logger.error(context ?? {}, message);
}

export function logDebug(message: string, context?: Record<string, unknown>) {
  logger.debug(context ?? {}, message);
}
