import * as c from "std/fmt/colors.ts";

type StyleFunction = (str: string) => string;
export type LogLevel = "info" | "warning" | "error";
type LogLevelSetting = {
  header: string;
  headerColor: StyleFunction;
  textColor: StyleFunction;
};

const logLevelSettings: Record<LogLevel, LogLevelSetting> = {
  info: { header: "INFO", headerColor: c.brightBlue, textColor: c.dim },
  warning: { header: "WARN", headerColor: c.brightMagenta, textColor: c.dim },
  error: { header: "ERROR", headerColor: c.brightRed, textColor: c.reset },
};
const maxHeaderSize = Object.entries(logLevelSettings)
  .reduce((max, [_, settings]) => Math.max(settings.header.length, max), 0);

export class Logger {
  private textEncoder = new TextEncoder();

  public info(message: string) {
    this.line("info", message);
  }

  public warn(message: string) {
    this.line("warning", message);
  }

  public error(message: string, err?: unknown): void {
    const errorMessage = (() => {
      if (!err) return null;
      if (err instanceof Error) {
        return errorToString(err);
      }
      return "" + err;
    })();
    this.line("error", `${message}${errorMessage ? `: ${errorMessage}` : ""}`);
  }

  public line(level: LogLevel, message: string) {
    Deno.stdout.write(
      this.textEncoder.encode(this.buildLine(level, message) + "\n"),
    );
  }

  private buildLine(level: LogLevel, message: string) {
    const settings = logLevelSettings[level];
    return c.getColorEnabled()
      ? `${
        c.bold(settings.headerColor(settings.header.padStart(maxHeaderSize)))
      } ${settings.textColor(c.stripColor(message))}`
      : `${settings.header}: ${c.stripColor(message)}`;
  }
}

function errorToString(err: Error): string {
  const errorToLines = (err: Error, prefix?: string): string[] => {
    const lines = [
      (prefix || "") + (err.stack || err.message),
    ];
    if (err.cause) {
      const causeLines = err.cause instanceof Error
        ? errorToLines(err.cause, "Caused by ")
        : ["Caused by " + err.cause];
      lines.push(...causeLines);
    }
    return lines;
  };
  return errorToLines(err).join("\n");
}
