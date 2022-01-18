import { WithClientFunc } from "../external/database.ts";
import { Talk } from "../../models/mod.ts";
import { withClient } from "../external/database.ts";

export class TalkStore {
  constructor(
    private withClient: WithClientFunc,
  ) {}

  findBySlug(slug: string): Promise<Talk | null> {
    return this.withClient(async (client) => {
      return await client.queryObject<Talk>`
        SELECT
          id, slug, name, description, speaker_name, speaker_title, speaker_image, track, date
        FROM talks WHERE slug = ${slug}`
        .then((r) => r.rows.length > 0 ? r.rows[0] : null);
    });
  }
}

export const talkStore = new TalkStore(withClient);
