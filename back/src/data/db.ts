import { Pool, PoolClient } from "postgres/mod.ts";
import config from "../config/mod.ts";

export const pool = new Pool({
  user: config.VENUE_DB_USER,
  password: config.VENUE_DB_PASSWORD,
  database: config.VENUE_DB_NAME,
  hostname: config.VENUE_DB_HOST,
  port: config.VENUE_DB_PORT,
}, config.VENUE_DB_POOL_SIZE);

export const withClient = async <T>(cb: (c: PoolClient) => Promise<T>) => {
  let client: PoolClient | null = null;
  try {
    client = await pool.connect();
    return await cb(client);
  } finally {
    client && client.release();
  }
};
export type WithClientFunc = typeof withClient;
