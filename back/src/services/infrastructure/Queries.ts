import { Talk } from "../../models/mod.ts";
import { WithClientFunc } from "../external/database_contract.ts";

export class Queries {
  constructor(
    private withClient: WithClientFunc,
  ) {}

  homeTalks(visitorId: string) {
    return this.withClient(async (client) => {
      const result = await client.queryObject`
        SELECT
          id, slug, name, description, speaker_name, speaker_title, speaker_image, track, date, r.rating as rated
        FROM talks t
        LEFT JOIN ratings r on r.talk_id = t.id and r.visitor_id = ${visitorId};`;
      return result.rows as (Talk & { rated?: string })[];
    });
  }
}
