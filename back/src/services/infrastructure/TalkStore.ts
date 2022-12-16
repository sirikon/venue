import { Talk } from "@/models/mod.ts";
import { Database } from "@/services/external/Database.ts";
import { singleton } from "tsyringe";

@singleton()
export class TalkStore {
  constructor(
    private database: Database,
  ) {}

  findBySlug(slug: string): Promise<Talk | null> {
    return this.database.withClient(async (client) => {
      return await client.queryObject<Talk>`
        SELECT
          id, slug, name, description, speaker_name, speaker_title, speaker_image, track, date
        FROM talks WHERE slug = ${slug}`
        .then((r) => r.rows.length > 0 ? r.rows[0] : null);
    });
  }
}
