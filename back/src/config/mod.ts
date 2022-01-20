const isTrue = (v: string) => v === "true";

const getEnv = <
  KT extends string,
  VT = string,
  ReqT extends boolean = true,
>(
  key: KT,
  opts?: {
    required?: ReqT;
    default?: string;
    map?: (value: string) => VT;
  },
): { [key in KT]: (ReqT extends true ? VT : (VT | null)) } => {
  const value = Deno.env.get(key);
  const mapper = opts?.map || ((v: string) => v);

  if (value) {
    return { [key]: mapper(value) } as { [key in KT]: VT };
  }
  if (opts?.default) {
    return { [key]: mapper(opts.default) } as { [key in KT]: VT };
  }
  throw new Error(`Missing required environment variable: ${key}`);
};

const PREFIX = "VENUE";
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
  ...getEnv(`${PREFIX}_BRAND_IMAGE`, { required: false }),
};
