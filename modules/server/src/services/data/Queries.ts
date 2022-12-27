import { Question, Rating, Talk } from "@/models/mod.ts";
import { singleton } from "tsyringe";
import { Database } from "@/services/data/Database.ts";

@singleton()
export class Queries {
  constructor(
    private database: Database,
  ) {}

  homeTalks(visitorId: string) {
    return this.database.withClient(async (client) => {
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
    return this.database.withClient(async (client) => {
      return await client.queryObject<Question>`
        SELECT
          id, visitor_id, talk_id, question
        FROM questions
        WHERE talk_id = ${talk.id}
        ORDER BY id DESC;`
        .then((r) => r.rows);
    });
  }

  talkRatings(talk: Pick<Talk, "id">) {
    return this.database.withClient(async (client) => {
      return await client.queryObject<Rating>`
        SELECT
          visitor_id, talk_id, rating, comment
        FROM ratings
        WHERE talk_id = ${talk.id};`
        .then((r) => r.rows);
    });
  }
}
