import * as Eta from "eta/mod.ts";
import { join } from "std/path/mod.ts";
import config from "../config/mod.ts";

Eta.configure({
  cache: config.VENUE_TEMPLATE_CACHING,
  views: join(config.VENUE_THEMES_FOLDER, config.VENUE_THEME_NAME),
});

export const render = async (path: string, data?: Record<string, unknown>) => {
  return (await Eta.renderFileAsync(path, data || {}))!;
};
