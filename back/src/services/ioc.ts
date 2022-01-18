import { withClient } from "./external/database.ts";
import { Queries } from "./infrastructure/Queries.ts";
import { QuestionStore } from "./infrastructure/QuestionStore.ts";
import { RatingStore } from "./infrastructure/RatingStore.ts";
import { TalkStore } from "./infrastructure/TalkStore.ts";

export const queries = new Queries(withClient);
export const questionStore = new QuestionStore(withClient);
export const ratingStore = new RatingStore(withClient);
export const talkStore = new TalkStore(withClient);
