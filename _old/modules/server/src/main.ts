import "reflect_metadata/mod.ts";
import { setConsoleHijackLogger } from "denox/logging/consoleHijack.ts";
import { container } from "tsyringe";
import { WebServer } from "@/web/WebServer.ts";
import { DatabaseMigrator } from "@/services/data/DatabaseMigrator.ts";
import { Logger } from "denox/logging/Logger.ts";

const log = container.resolve(Logger);

globalThis.addEventListener("unhandledrejection", (e) => {
  e.preventDefault();
  log.error("Unhandled rejection", e.reason);
});

Deno.addSignalListener("SIGINT", () => {
  log.info("Shutting down");
});

setConsoleHijackLogger(log);

try {
  await container.resolve(DatabaseMigrator).migrate();
  await container.resolve(WebServer).start();
} catch (err) {
  log.error("Error during server initialization", err);
}
