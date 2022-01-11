import { Application } from "oak/mod.ts";
import config from "../config/mod.ts";

export const webServer = async () => {
  const app = new Application();
  app.use((ctx) => {
    ctx.response.body = "Hello World!";
  });

  app.addEventListener("listen", (e) => {
    console.log(`Listening on port ${e.port}`);
  });

  await app.listen({ port: config.CONFPANION_PORT });
};
