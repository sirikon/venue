import { configFromEnvironment } from "denox/config/environment.ts";

const PREFIX = "CONFPANION";

export default configFromEnvironment()
  .key(`${PREFIX}_PORT`, { default: "8000", map: parseInt })
  .key(`${PREFIX}_DB_USER`)
  .key(`${PREFIX}_DB_PASSWORD`)
  .key(`${PREFIX}_DB_NAME`)
  .key(`${PREFIX}_DB_HOST`)
  .key(`${PREFIX}_DB_PORT`, { default: "5432", map: parseInt })
  .read();
