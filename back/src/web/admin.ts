import { decode } from "std/encoding/base64.ts";
import { Context } from "oak/mod.ts";
import config from "../config/mod.ts";

const BASIC_AUTH_REALM = `Login as admin to ${config.VENUE_BRAND_NAME}`;
const ADMIN_COOKIE_NAME = "venue_admin";

export const loginHandler = async (ctx: Context) => {
  const authorization = parseAuthorization(ctx);
  if (!authorization) {
    return replyWithAuthenticationRequired(ctx);
  }

  if (
    authorization.username === config.VENUE_ADMIN_USERNAME &&
    authorization.password === config.VENUE_ADMIN_PASSWORD
  ) {
    await ctx.cookies.set(ADMIN_COOKIE_NAME, "true");
    ctx.response.redirect("/");
    return;
  }

  replyWithAuthenticationRequired(ctx);
};

export const isAdmin = async (ctx: Context) =>
  (await ctx.cookies.get(ADMIN_COOKIE_NAME)) === "true";

const replyWithAuthenticationRequired = (ctx: Context) => {
  ctx.response.status = 401;
  ctx.response.headers.set(
    "www-authenticate",
    `Basic realm="${BASIC_AUTH_REALM}"`,
  );
};

const parseAuthorization = (ctx: Context) => {
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
};
