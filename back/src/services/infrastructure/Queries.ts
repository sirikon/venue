import { withClient, WithClientFunc } from "../../data/db.ts";
import { Talk } from "../../models/mod.ts";

export class Queries {
  constructor(
    private withClient: WithClientFunc,
  ) {}

  homeTalks (visitor_id: string) {
    return this.withClient(async (client) => {
      const result = await client.queryObject`
        SELECT
          id, slug, name, description, speaker_name, speaker_title, speaker_image, track, date, r.rating as rated
        FROM talks t
        LEFT JOIN ratings r on r.talk_id = t.id and r.visitor_id = ${visitor_id};`;
      return result.rows as (Talk & { rated?: string })[];
    })
  }
}

export const queries = new Queries(withClient);
