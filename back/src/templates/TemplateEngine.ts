import * as Eta from "eta/mod.ts";
import { join } from "std/path/mod.ts";
import { ConfigProvider } from "@/config/ConfigProvider.ts";
import { singleton } from "tsyringe";

@singleton()
export class TemplateEngine {
  constructor(
    private configProvider: ConfigProvider,
  ) {
    const config = this.configProvider.getConfig();
    Eta.configure({
      cache: config.VENUE_TEMPLATE_CACHING,
      views: join(config.VENUE_THEMES_FOLDER, config.VENUE_THEME_NAME),
    });

    Eta.templates.define(
      "extra-meta",
      Eta.compile(config.VENUE_EXTRA_META || ""),
    );
    Eta.templates.define("brand-name", Eta.compile(config.VENUE_BRAND_NAME));
    Eta.templates.define(
      "brand-image",
      Eta.compile(config.VENUE_BRAND_IMAGE || ""),
    );
  }

  public async render(
    path: string,
    data?: Record<string, unknown>,
  ): Promise<string> {
    return (await Eta.renderFileAsync(path, data || {}))!;
  }
}
