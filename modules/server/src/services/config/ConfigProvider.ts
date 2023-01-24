import { buildConfig } from "denox/config/environment.ts";
import { singleton } from "tsyringe";

const isTrue = (v: string) => v === "true";

const configBuilder = buildConfig({
  VENUE_PORT: {
    description: "Port to listen to",
    default: "80",
    map: parseInt,
  },
  VENUE_DB_USER: {
    description: "PostgreSQL username",
  },
  VENUE_DB_PASSWORD: {
    description: "PostgreSQL password",
  },
  VENUE_DB_NAME: {
    description: "PostgreSQL database name",
  },
  VENUE_DB_HOST: {
    description: "PostgreSQL database host",
  },
  VENUE_DB_PORT: {
    description: "PostgreSQL database port",
    default: "5432",
    map: parseInt,
  },
  VENUE_DB_POOL_SIZE: {
    description: "PostgreSQL connection pool size",
    default: "5",
    map: parseInt,
  },
  VENUE_DB_SEED: {
    description:
      "Seed database with example data. Normally you'll need this for development or evaluation purposes only.",
    default: "false",
    map: isTrue,
  },
  VENUE_TEMPLATE_CACHING: {
    description: "Enable template caching",
    default: "false",
    map: isTrue,
  },
  VENUE_THEMES_FOLDER: {
    description: "Location of themes folder",
    default: "resources/themes",
  },
  VENUE_THEME_NAME: {
    description: "Theme name",
    default: "default",
  },
  VENUE_VISITOR_COOKIE_SECRET: {
    description: "The secret to be used when signing cookies",
  },
  VENUE_BRAND_NAME: {
    description: "Brand name",
  },
  VENUE_BRAND_IMAGE: {
    description: "Absolute URL to the brand image",
    required: false,
  },
  VENUE_ADMIN_USERNAME: {
    description: "Administrator username",
  },
  VENUE_ADMIN_PASSWORD: {
    description: "Administrator password",
  },
  VENUE_EXTRA_META: {
    description: "Extra meta elements to be added on top of <head>",
    required: false,
  },
  VENUE_BEFORE_TALKS_HTML_PATH: {
    description: "Path to an HTML file that will be included right before talk listings",
    required: false
  },
  VENUE_AFTER_TALKS_HTML_PATH: {
    description: "Path to an HTML file that will be included right after talk listings",
    required: false
  },
  VENUE_LOG_TIME_MEASURE: {
    description: "Enable to get time measurements logged",
    required: false,
    map: isTrue,
  },
});
export type Config = ReturnType<typeof configBuilder["read"]>;

@singleton()
export class ConfigProvider {
  private config = configBuilder.read();

  public getConfig() {
    return this.config;
  }
}
