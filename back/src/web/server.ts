import { Application } from "oak/mod.ts";
import config from "../config/mod.ts";
import { talkStore } from "../services/infrastructure/TalkStore.ts";

export const webServer = async () => {
  const app = new Application();
  app.use(async (ctx) => {
    ctx.response.body = await talkStore.findAll();
  });

  app.addEventListener("listen", (e) => {
    console.log(`Listening on port ${e.port}`);
  });

  await app.listen({ port: config.CONFPANION_PORT });
};
