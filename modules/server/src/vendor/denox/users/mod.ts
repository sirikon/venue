import { must } from "../result/mod.ts";
import { bash, cmd } from "../shell/mod.ts";

export const ensureGroup = (groupName: string) =>
  bash(
    `getent group "${groupName}" &>/dev/null || groupadd --system "${groupName}"`,
  ).then(must);

export const ensureUser = (userName: string, groupName: string, home: string) =>
  bash(`
    id -u "${userName}" &>/dev/null || useradd \\
      --system --gid "${groupName}" \\
      --home-dir "${home}" --create-home \\
      --shell "/usr/bin/bash" "${userName}"
  `).then(must);

export const getCurrentUser = () =>
  cmd(["id", "-un"], { stdout: "piped" })
    .then(must)
    .then((r) => r.output())
    .then((d) => d.replaceAll("\n", "").trim());
