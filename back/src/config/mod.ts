import { configFromEnvironment } from "denox/config/environment.ts";

const PREFIX = "CONFPANION";

export default configFromEnvironment()
  .key(`${PREFIX}_PORT`, { default: "8000" })
  .read();
