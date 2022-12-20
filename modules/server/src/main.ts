import "reflect_metadata/mod.ts";
import { container } from "tsyringe";

import { WebServer } from "@/web/WebServer.ts";
import { Logger } from "@/services/logging/Logger.ts";
import { DatabaseMigrator } from "./services/data/DatabaseMigrator.ts";

const log = container.resolve(Logger);

globalThis.addEventListener("unhandledrejection", (e) => {
  e.preventDefault();
  log.error("Unhandled rejection", e.reason);
  Deno.exit(1);
});

Deno.addSignalListener("SIGINT", () => {
  log.info("Shutting down");
});

try {
  console.log(await container.resolve(DatabaseMigrator).migrate());
  await container.resolve(WebServer).start();
} catch (err) {
  log.error("Error during server initialization", err);
}
