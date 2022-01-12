import { Client } from "postgres/mod.ts";
import config from "../config/mod.ts";

export const client = new Client({
  user: config.VENUE_DB_USER,
  password: config.VENUE_DB_PASSWORD,
  database: config.VENUE_DB_NAME,
  hostname: config.VENUE_DB_HOST,
  port: config.VENUE_DB_PORT,
});
await client.connect();
