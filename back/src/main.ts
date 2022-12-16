import "reflect_metadata/mod.ts";
import { WebServer } from "@/web/WebServer.ts";
import { container } from "tsyringe";
await container.resolve(WebServer).start();
