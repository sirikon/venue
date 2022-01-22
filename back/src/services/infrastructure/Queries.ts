import { Question, Talk } from "../../models/mod.ts";
import { withClient, WithClientFunc } from "../external/database.ts";

export class Queries {
  constructor(
    private withClient: WithClientFunc,
  ) {}

  homeTalks(visitorId: string) {
    return this.withClient(async (client) => {
      const cosa = "2".padStart(2, '0')
      return await client.queryObject<Talk & { rated?: string }>`
        SELECT
          id, slug, name, description, speaker_name, speaker_title, speaker_image, track, date, r.rating as rated
        FROM talks t
        LEFT JOIN ratings r on r.talk_id = t.id and r.visitor_id = ${visitorId}
        ORDER BY date ASC;`
        .then((r) => r.rows);
    });
  }

  talkQuestions(talk: Pick<Talk, "id">) {
    return this.withClient(async (client) => {
      return await client.queryObject<Question>`
        SELECT
          id, visitor_id, talk_id, question
        FROM questions
        WHERE talk_id = ${talk.id}
        ORDER BY id DESC;`
        .then((r) => r.rows);
    });
  }
}

export const queries = new Queries(withClient);
