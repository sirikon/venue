import { withClient, WithClientFunc } from "../../data/db.ts";
import { Rating } from "../../models/mod.ts";

export class RatingStore {
  constructor(
    private withClient: WithClientFunc,
  ) {}

  saveRating(rating: Omit<Rating, "id">) {
    return this.withClient(async (client) => {
      return await client.queryArray`
        INSERT INTO ratings
          (visitor_id, talk_id, rating, comment)
        VALUES
          (${rating.visitor_id}, ${rating.talk_id}, ${rating.rating}, ${rating.comment})
        ON CONFLICT DO NOTHING;`;
    });
  }
}

export const ratingStore = new RatingStore(withClient);
