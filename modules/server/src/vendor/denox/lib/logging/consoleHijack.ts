import { Logger, LogLevel } from "denox/logging/Logger.ts";

const methodsToHijack = ["log", "debug", "info", "warn", "error"] as const;
type ConsoleMethod = typeof methodsToHijack[number];
type ConsoleHijack = (method: ConsoleMethod, data: unknown[]) => void;

let consoleHijack: ConsoleHijack = (_, __) => {};
for (const method of methodsToHijack) {
  console[method] = (...data: unknown[]) => consoleHijack(method, data);
}

export const setConsoleHijack = (cb: typeof consoleHijack) => {
  consoleHijack = cb;
};

export const setConsoleHijackLogger = (log: Logger) => {
  setConsoleHijack((method, data) => {
    const level: LogLevel = (() => {
      if (method === "warn") return "warning";
      if (method === "error") return "warning";
      return "info";
    })();
    log.line(level, `console.${method}: ${data}`);
  });
};
