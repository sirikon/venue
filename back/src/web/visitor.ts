import { Context } from "https://deno.land/x/oak@v10.1.0/mod.ts";

const VISITOR_COOKIE_NAME = "venue_visitor";

export const ensureVisitorCookie = async (ctx: Context) => {
  const existingCookie = await ctx.cookies.get(VISITOR_COOKIE_NAME);
  if (!existingCookie) {
    await ctx.cookies.set(VISITOR_COOKIE_NAME, crypto.randomUUID());
  }
};

export const getVisitorId = async (ctx: Context) =>
  (await ctx.cookies.get(VISITOR_COOKIE_NAME))!;
