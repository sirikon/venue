import { ExactOmit } from "../types/mod.ts";

export type CmdOptions = ExactOmit<Deno.RunOptions, "cmd">;

export const cmd = async (
  args: string[],
  opts?: CmdOptions,
) => {
  const process = Deno.run({
    cmd: args,
    ...opts,
  });
  const status = await process.status();
  if (!status.success) {
    throw new Error("Process failed with status code " + status.code);
  }
  return {
    output: () => process.output().then((d) => new TextDecoder().decode(d)),
  };
};

export const bash = (script: string, opts?: CmdOptions) =>
  cmd(["bash", "-c", script], opts);
export const sh = (script: string, opts?: CmdOptions) =>
  cmd(["sh", "-c", script], opts);
