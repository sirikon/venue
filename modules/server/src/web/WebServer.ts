import { join } from "std/path/mod.ts";
import { Application, send } from "oak/mod.ts";
import { ensureVisitorCookie } from "@/web/visitor.ts";
import { GlobalRouter } from "@/web/GlobalRouter.ts";
import { ConfigProvider } from "@/services/config/ConfigProvider.ts";
import { singleton } from "tsyringe";
import { Logger } from "denox/logging/Logger.ts";
import { Measurer } from "../services/logging/Measurer.ts";

@singleton()
export class WebServer {
  constructor(
    private log: Logger,
    private measurer: Measurer,
    private configProvider: ConfigProvider,
    private globalRouter: GlobalRouter,
  ) {}

  public async start() {
    const config = this.configProvider.getConfig();

    const app = new Application({
      keys: [config.VENUE_VISITOR_COOKIE_SECRET],
    });

    app.use(async (ctx, next) => {
      await this.measurer.measure(
        `${ctx.request.method} ${ctx.request.url}`,
        next,
      );
    });

    app.use(async (ctx, next) => {
      await ensureVisitorCookie(ctx);
      await next();
    });

    const router = this.globalRouter.getRouter();

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
      this.log.info(`Listening on http://${e.hostname}:${e.port}`);
    });

    await app.listen({ port: config.VENUE_PORT });
  }
}
