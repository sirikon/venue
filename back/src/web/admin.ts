import { Context } from "oak/mod.ts";

const ADMIN_COOKIE_NAME = "venue_admin";

export const setAdminCookie = async (ctx: Context) => {
  await ctx.cookies.set(ADMIN_COOKIE_NAME, "true");
};

export const isAdmin = async (ctx: Context) =>
  (await ctx.cookies.get(ADMIN_COOKIE_NAME)) === "true";
