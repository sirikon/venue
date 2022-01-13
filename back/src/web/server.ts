import { join } from "std/path/mod.ts";
import { Application, Router, send } from "oak/mod.ts";
import config from "../config/mod.ts";
import { render } from "../templates/mod.ts";
import { talkStore } from "../services/infrastructure/TalkStore.ts";

export const webServer = async () => {
  const router = new Router();

  router.get("/", async (ctx) => {
    const talks = await talkStore.findAll();
    ctx.response.body = await render("index.html", { talks });
  });

  router.get("/static/:path*", async (ctx) => {
    if (!ctx.params.path) {
      ctx.response.status = 404;
      return;
    }
    await send(ctx, ctx.params.path, {
      root: join(
        config.VENUE_THEMES_FOLDER,
        config.VENUE_THEME_NAME,
        "static",
      ),
    });
  });

  const app = new Application();
  app.use(router.routes());
  app.use(router.allowedMethods());

  app.addEventListener("listen", (e) => {
    console.log(`Listening on port ${e.port}`);
  });

  await app.listen({ port: config.VENUE_PORT });
};
