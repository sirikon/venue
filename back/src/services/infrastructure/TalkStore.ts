import { client } from "../../data/db.ts";
import { Talk } from "../../models/mod.ts";

export class TalkStore {
  constructor(
    private db: typeof client,
  ) {}

  async findAll(): Promise<Talk[]> {
    const result = await this.db.queryObject
      `SELECT id, slug, name, description FROM talks`;
    return result.rows as Talk[];
  }
}

export const talkStore = new TalkStore(client);
