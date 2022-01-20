import { Pool, PoolClient } from "postgres/mod.ts";
import config from "../../config/mod.ts";

export type DBClient = {
  queryObject: <T>(
    query: TemplateStringsArray,
    ...args: unknown[]
  ) => Promise<{ rows: T[] }>;
};

export type WithClientFunc = <T>(cb: (c: DBClient) => Promise<T>) => Promise<T>;

const pool = new Pool({
  user: config.VENUE_DB_USER,
  password: config.VENUE_DB_PASSWORD,
  database: config.VENUE_DB_NAME,
  hostname: config.VENUE_DB_HOST,
  port: config.VENUE_DB_PORT,
}, config.VENUE_DB_POOL_SIZE);

export const withClient: WithClientFunc = async <T>(
  cb: (c: DBClient) => Promise<T>,
) => {
  let client: PoolClient | null = null;
  try {
    client = await pool.connect();
    return await cb(client);
  } finally {
    client && client.release();
  }
};