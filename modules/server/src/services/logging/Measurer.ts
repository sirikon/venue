import { Logger } from "denox/logging/Logger.ts";
import { singleton } from "tsyringe";
import { Config, ConfigProvider } from "../config/ConfigProvider.ts";

@singleton()
export class Measurer {
  private config: Config;
  constructor(
    private log: Logger,
    private configProvider: ConfigProvider,
  ) {
    this.config = this.configProvider.getConfig();
  }

  public measure<T>(name: string, cb: () => Promise<T>): Promise<T> {
    if (!this.config.VENUE_LOG_TIME_MEASURE) return cb();
    const start = performance.now();
    try {
      return cb();
    } finally {
      const end = performance.now();
      const result = Math.round((end - start) * 100) / 100;
      this.log.info(`Measure ${name}: ${result}ms`);
    }
  }
}
