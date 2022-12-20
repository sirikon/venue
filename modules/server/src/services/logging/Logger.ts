import * as c from "std/fmt/colors.ts";
import { singleton } from "tsyringe";

type StyleFunction = (str: string) => string;
export type LogLevel = "info" | "warning" | "error";
type LogLevelSetting = {
  header: string;
  headerColor: StyleFunction;
  textColor: StyleFunction;
};

const logLevelSettings: Record<LogLevel, LogLevelSetting> = {
  info: { header: "INFO", headerColor: c.brightBlue, textColor: c.dim },
  warning: { header: "WARN", headerColor: c.brightMagenta, textColor: c.reset },
  error: { header: "ERROR", headerColor: c.brightRed, textColor: c.reset },
};
const maxHeaderSize = Object.entries(logLevelSettings)
  .reduce((max, [_, settings]) => Math.max(settings.header.length, max), 0);

@singleton()
export class Logger {
  public info(message: string) {
    this.line("info", message);
  }

  public error(message: string, err?: unknown): void {
    const errorMessage = (() => {
      if (!err) return null;
      if (err instanceof Error) {
        return err.stack || err.message;
      }
      return "" + err;
    })();
    this.line("error", `${message}${errorMessage ? `: ${errorMessage}` : ""}`);
  }

  public line(level: LogLevel, message: string) {
    console.log(this.buildLine(level, message));
  }

  private buildLine(level: LogLevel, message: string) {
    const settings = logLevelSettings[level];
    return c.getColorEnabled()
      ? `${
        c.bold(settings.headerColor(settings.header.padStart(maxHeaderSize)))
      } ${settings.textColor(message)}`
      : `${settings.header}: ${message}`;
  }
}
