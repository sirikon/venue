const PREFIX = "VENUE";
const isTrue = (v: string) => v === "true";

const getEnv = <K extends string, T = string>(
  key: K,
  opts?: { default?: K; map?: (value: string) => T },
): { [key in K]: T } => {
  const value = Deno.env.get(key);
  const mapper = opts?.map || ((v: string) => v);

  if (value) {
    const result = { [key]: mapper(value) };
    return result as { [key in K]: T };
  }
  if (opts?.default) {
    const result = { [key]: mapper(opts.default) };
    return result as { [key in K]: T };
  }
  throw new Error(`Missing required environment variable: ${key}`);
};

export default {
  ...getEnv(`${PREFIX}_PORT`, { default: "8000", map: parseInt }),
  ...getEnv(`${PREFIX}_DB_USER`),
  ...getEnv(`${PREFIX}_DB_PASSWORD`),
  ...getEnv(`${PREFIX}_DB_NAME`),
  ...getEnv(`${PREFIX}_DB_HOST`),
  ...getEnv(`${PREFIX}_DB_PORT`, { default: "5432", map: parseInt }),
  ...getEnv(`${PREFIX}_DB_POOL_SIZE`, { default: "20", map: parseInt }),
  ...getEnv(`${PREFIX}_TEMPLATE_CACHING`, { default: "false", map: isTrue }),
  ...getEnv(`${PREFIX}_THEMES_FOLDER`, { default: "resources/themes" }),
  ...getEnv(`${PREFIX}_THEME_NAME`, { default: "default" }),
  ...getEnv(`${PREFIX}_VISITOR_COOKIE_SECRET`),
  ...getEnv(`${PREFIX}_BRAND_NAME`),
  ...getEnv(`${PREFIX}_BRAND_IMAGE`, { default: "" }),
};
