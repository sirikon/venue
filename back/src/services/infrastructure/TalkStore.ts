import { withClient, WithClientFunc } from "../../data/db.ts";
import { Talk } from "../../models/mod.ts";

export class TalkStore {
  constructor(
    private withClient: WithClientFunc,
  ) {}

  findAll(): Promise<Talk[]> {
    return this.withClient(async (client) => {
      const result = await client.queryObject`
        SELECT
          id, slug, name, description, speaker_name, speaker_title, speaker_image, track, date
        FROM talks`;
      return result.rows as Talk[];
    });
  }

  findBySlug(slug: string): Promise<Talk | null> {
    return this.withClient(async (client) => {
      const result = await client.queryObject`
        SELECT
          id, slug, name, description, speaker_name, speaker_title, speaker_image, track, date
        FROM talks WHERE slug = ${slug}`;
      return result.rows.length > 0 ? result.rows[0] as Talk : null;
    });
  }
}

export const talkStore = new TalkStore(withClient);
