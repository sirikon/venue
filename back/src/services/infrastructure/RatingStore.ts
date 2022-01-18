import { WithClientFunc } from "../external/database_contract.ts";
import { Rating } from "../../models/mod.ts";

export class RatingStore {
  constructor(
    private withClient: WithClientFunc,
  ) {}

  getByTalkAndVisitor(filter: Pick<Rating, "visitor_id" | "talk_id">) {
    return this.withClient(async (client) => {
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
    return this.withClient(async (client) => {
      return await client.queryObject`
        INSERT INTO ratings
          (visitor_id, talk_id, rating, comment)
        VALUES
          (${rating.visitor_id}, ${rating.talk_id}, ${rating.rating}, ${rating.comment})
        ON CONFLICT DO NOTHING;`;
    });
  }
}
