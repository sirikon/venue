import { withClient, WithClientFunc } from "../../data/db.ts";
import { Question } from "../../models/mod.ts";

export class QuestionStore {
  constructor(
    private withClient: WithClientFunc,
  ) {}

  saveQuestion(question: Omit<Question, "id">) {
    return this.withClient(async (client) => {
      return await client.queryArray`
        INSERT INTO questions
          (visitor_id, talk_id, question)
        VALUES
          (${question.visitor_id}, ${question.talk_id}, ${question.question});`;
    });
  }
}

export const questionStore = new QuestionStore(withClient);
