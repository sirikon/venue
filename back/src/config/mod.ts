import { buildConfig } from "denox/config/environment.ts";

const isTrue = (v: string) => v === "true";

const config = buildConfig({
  VENUE_PORT: {
    description: "Port to listen to",
    default: "8000",
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
});

export default config.read();
