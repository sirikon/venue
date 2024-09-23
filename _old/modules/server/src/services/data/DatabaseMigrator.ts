import { singleton } from "tsyringe";
import { Database } from "@/services/data/Database.ts";
import { basename, join } from "std/path/mod.ts";
import { Config, ConfigProvider } from "@/services/config/ConfigProvider.ts";
import { Logger } from "denox/logging/Logger.ts";

@singleton()
export class DatabaseMigrator {
  private config: Config;
  constructor(
    private log: Logger,
    private configProvider: ConfigProvider,
    private db: Database,
  ) {
    this.config = this.configProvider.getConfig();
  }

  public async migrate() {
    await this.ensureChangelogTable();
    const changelog = await this.getChangelog();
    for (const migration of await this.getMigrations()) {
      const migrationName = basename(migration);
      if (!changelog.find((m) => m.name === migrationName)) {
        const migrationSql = await Deno.readTextFile(migration);
        this.log.info(`Migration ${migrationName}: Applying`);
        await this.applyMigration(migrationName, migrationSql);
      } else {
        this.log.info(`Migration ${migrationName}: Aready applied`);
      }
    }
  }

  private async ensureChangelogTable() {
    await this.db.withClient(async (client) => {
      await client.queryObject`
        CREATE TABLE IF NOT EXISTS venue_changelog (name TEXT PRIMARY KEY);
      `;
    });
  }

  private async getChangelog() {
    return await this.db.withClient(async (client) => {
      return await client.queryObject<{ name: string }>`
        SELECT name FROM venue_changelog;
      `.then((r) => r.rows);
    });
  }

  private async applyMigration(name: string, sql: string) {
    await this.db.withClient(async (client) => {
      const transaction = client.createTransaction(
        `migration-${name}`,
      );
      try {
        await transaction.begin();
        await transaction.queryObject(sql);
        await transaction
          .queryObject`INSERT INTO venue_changelog (name) VALUES (${name})`;
        await transaction.commit();
      } catch (err: unknown) {
        try {
          await transaction.rollback();
        } catch (err: unknown) {
          if (
            !(err instanceof Error) ||
            !err.message.startsWith(
              "This transaction has not been started yet",
            )
          ) {
            this.log.error("Error during transaction rollback", err);
          }
        }
        throw err;
      }
    });
  }

  private async getMigrations() {
    return [
      ...(await this.getMigrationsFrom("resources/db/migrations"))
        .filter((migration) => {
          if (!basename(migration).endsWith(".seed.sql")) return true;
          return this.config.VENUE_DB_SEED;
        }),
      ...(await this.getMigrationsFrom("resources/db/custom-migrations")),
    ];
  }

  private async getMigrationsFrom(path: string) {
    try {
      const migrationsPath = join(Deno.cwd(), path);
      const files = Deno.readDir(migrationsPath);
      const result = [];
      for await (const file of files) {
        if (file.isFile) {
          result.push(join(migrationsPath, file.name));
        }
      }
      result.sort();
      return result;
    } catch (err) {
      if (err instanceof Deno.errors.NotFound) {
        return [];
      }
      throw err;
    }
  }
}
