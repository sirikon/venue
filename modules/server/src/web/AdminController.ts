import { decode } from "std/encoding/base64.ts";
import { Context } from "oak/mod.ts";
import { singleton } from "tsyringe";
import { Config, ConfigProvider } from "@/services/config/ConfigProvider.ts";

const ADMIN_COOKIE_NAME = "venue_admin";

@singleton()
export class AdminController {
  private config: Config;
  constructor(
    private configProvider: ConfigProvider,
  ) {
    this.config = this.configProvider.getConfig();
  }

  public async loginHandler(ctx: Context) {
    const authorization = this.parseAuthorization(ctx);
    if (!authorization) {
      return this.replyWithAuthenticationRequired(ctx);
    }

    if (
      authorization.username === this.config.VENUE_ADMIN_USERNAME &&
      authorization.password === this.config.VENUE_ADMIN_PASSWORD
    ) {
      await ctx.cookies.set(ADMIN_COOKIE_NAME, "true");
      ctx.response.redirect("/");
      return;
    }

    this.replyWithAuthenticationRequired(ctx);
  }

  public async isAdmin(ctx: Context) {
    return (await ctx.cookies.get(ADMIN_COOKIE_NAME)) === "true";
  }

  private replyWithAuthenticationRequired(ctx: Context) {
    ctx.response.status = 401;
    ctx.response.headers.set(
      "www-authenticate",
      `Basic realm="Login as admin to ${this.config.VENUE_BRAND_NAME}"`,
    );
  }

  private parseAuthorization(ctx: Context) {
    const authorization = ctx.request.headers.get("authorization");
    if (!authorization || !authorization.startsWith("Basic ")) {
      return null;
    }

    const data = new TextDecoder().decode(
      decode(authorization.substring("Basic ".length)),
    ).split(":");
    return {
      username: data[0],
      password: data[1],
    };
  }
}
