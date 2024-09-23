import { assertUnreachable } from "../../types/mod.ts";

const encoder = new TextEncoder();

export class Progress {
  constructor() {
    console.log();
  }
  async set(
    data: {
      mode: "percent";
      value: number;
      prefix: string;
    } | {
      mode: "total";
      value: number;
      prefix: string;
    },
  ) {
    if (data.mode === "percent") {
      await writeLine(
        `${data.prefix}: ${
          Math.round(data.value * 100).toString().padStart(3, " ")
        }%`,
      );
      return;
    }

    if (data.mode === "total") {
      await writeLine(`${data.prefix}: ${data.value}`);
      return;
    }

    assertUnreachable(data);
  }
}

const writeLine = async (line: string) => {
  const textToWrite: string[] = [];
  if (Deno.isatty(Deno.stdout.rid)) {
    textToWrite.push("\x1B[1A\x1B[2K\r");
  }
  await Deno.stdout.write(
    encoder.encode([...textToWrite, line, "\n"].join("")),
  );
};
