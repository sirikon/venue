import { Rating } from "@/models/mod.ts";
import { Database } from "@/services/data/Database.ts";
import { singleton } from "tsyringe";

@singleton()
export class RatingStore {
  constructor(
    private database: Database,
  ) {}

  getByTalkAndVisitor(filter: Pick<Rating, "visitor_id" | "talk_id">) {
    return this.database.withClient(async (client) => {
      return await client.queryObject<Rating>`
        SELECT
          visitor_id, talk_id, rating, comment
        FROM ratings
        WHERE
          visitor_id = ${filter.visitor_id}
          AND talk_id = ${filter.talk_id};`
        .then((r) => r.rows.length > 0 ? r.rows[0] : null);
    });
  }

  saveRating(rating: Omit<Rating, "id">) {
    return this.database.withClient(async (client) => {
      return await client.queryObject`
        INSERT INTO ratings
          (visitor_id, talk_id, rating, comment)
        VALUES
          (${rating.visitor_id}, ${rating.talk_id}, ${rating.rating}, ${rating.comment})
        ON CONFLICT DO NOTHING;`;
    });
  }
}
