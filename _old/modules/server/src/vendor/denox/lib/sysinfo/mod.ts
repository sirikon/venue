import { cmd } from "denox/shell/mod.ts";

export const getRelease = () =>
  cmd(["lsb_release", "-cs"], { stdout: "piped" })
    .then((r) => r.output())
    .then((d) => d.replace("\n", "").toLowerCase());

export const getDistribution = () =>
  cmd(["lsb_release", "-is"], { stdout: "piped" })
    .then((r) => r.output())
    .then((d) => d.replace("\n", "").toLowerCase());
