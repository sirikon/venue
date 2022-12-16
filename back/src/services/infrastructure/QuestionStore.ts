import { Question } from "@/models/mod.ts";
import { Database } from "@/services/external/Database.ts";
import { singleton } from "tsyringe";

@singleton()
export class QuestionStore {
  constructor(
    private database: Database,
  ) {}

  saveQuestion(question: Omit<Question, "id">) {
    return this.database.withClient(async (client) => {
      return await client.queryObject`
        INSERT INTO questions
          (visitor_id, talk_id, question)
        VALUES
          (${question.visitor_id}, ${question.talk_id}, ${question.question});`;
    });
  }
}
