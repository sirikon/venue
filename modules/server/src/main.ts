import { setConsoleHijack } from "@/consoleHijack.ts";
import "reflect_metadata/mod.ts";
import { container } from "tsyringe";

import { WebServer } from "@/web/WebServer.ts";
import { Logger, LogLevel } from "@/services/logging/Logger.ts";
import { DatabaseMigrator } from "@/services/data/DatabaseMigrator.ts";

const log = container.resolve(Logger);

globalThis.addEventListener("unhandledrejection", (e) => {
  e.preventDefault();
  log.error("Unhandled rejection", e.reason);
});

Deno.addSignalListener("SIGINT", () => {
  log.info("Shutting down");
});

setConsoleHijack((method, data) => {
  const level: LogLevel = (() => {
    if (method === "warn") return "warning";
    if (method === "error") return "warning";
    return "info";
  })();
  log.line(level, `console.${method}: ${data}`);
});

try {
  await container.resolve(DatabaseMigrator).migrate();
  await container.resolve(WebServer).start();
} catch (err) {
  log.error("Error during server initialization", err);
}
