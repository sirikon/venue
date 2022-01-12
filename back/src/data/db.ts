import { Client } from "postgres/mod.ts";
import config from "../config/mod.ts";

export const client = new Client({
  user: config.CONFPANION_DB_USER,
  password: config.CONFPANION_DB_PASSWORD,
  database: config.CONFPANION_DB_NAME,
  hostname: config.CONFPANION_DB_HOST,
  port: config.CONFPANION_DB_PORT,
});
await client.connect();
