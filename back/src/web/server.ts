import { join } from "std/path/mod.ts";
import { Application, Router, send } from "oak/mod.ts";
import config from "../config/mod.ts";
import { ensureVisitorCookie } from "./visitor.ts";
import routes from "./routes.ts";

export const webServer = async () => {
  const app = new Application({
    keys: [config.VENUE_VISITOR_COOKIE_SECRET],
  });

  app.use(async (ctx, next) => {
    await ensureVisitorCookie(ctx);
    await next();
  });

  const router = new Router();

  routes(router);

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

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.addEventListener("listen", (e) => {
    console.log(`Listening on port ${e.port}`);
  });

  await app.listen({ port: config.VENUE_PORT });
};
