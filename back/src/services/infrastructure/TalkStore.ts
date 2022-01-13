import { withClient, WithClientFunc } from "../../data/db.ts";
import { Talk } from "../../models/mod.ts";

export class TalkStore {
  constructor(
    private withClient: WithClientFunc,
  ) {}

  findAll(): Promise<Talk[]> {
    return this.withClient(async (client) => {
      const result = await client.queryObject
        `SELECT id, slug, name, description, speaker_name, speaker_title, track, date FROM talks`;
      return result.rows as Talk[];
    });
  }
}

export const talkStore = new TalkStore(withClient);
