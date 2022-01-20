import { Router } from "oak/mod.ts";
import { render } from "../templates/mod.ts";
import { assert, string, type } from "denox/superstruct/index.ts";
import { getVisitorId } from "./visitor.ts";
import { getQuery } from "oak/helpers.ts";
import { queries } from "../services/infrastructure/Queries.ts";
import { talkStore } from "../services/infrastructure/TalkStore.ts";
import { ratingStore } from "../services/infrastructure/RatingStore.ts";
import { questionStore } from "../services/infrastructure/QuestionStore.ts";
import { isAdmin, loginHandler } from "./admin.ts";

export default (router: Router) => {
  router.get("/admin", loginHandler);

  router.get("/talk/:slug/questions", async (ctx) => {
    if (!await isAdmin(ctx)) {
      ctx.response.status = 401;
      return;
    }
    const talk = await talkStore.findBySlug(ctx.params.slug);
    if (!talk) {
      ctx.response.status = 404;
      return;
    }
    const questions = await queries.talkQuestions(talk);
    ctx.response.body = await render("talk_questions.html", {
      talk,
      questions,
    });
  });

  router.get("/", async (ctx) => {
    const talks = await queries.homeTalks(await getVisitorId(ctx));
    ctx.response.body = await render("index.html", {
      talks,
      isAdmin: await isAdmin(ctx),
    });
  });

  router.get("/talk/:slug", async (ctx) => {
    const talk = await talkStore.findBySlug(ctx.params.slug);
    if (!talk) {
      ctx.response.status = 404;
      return;
    }
    const existingRating = await ratingStore.getByTalkAndVisitor({
      talk_id: talk.id,
      visitor_id: await getVisitorId(ctx),
    });
    const questionSent = getQuery(ctx)["q"] === "1";
    ctx.response.body = await render("talk.html", {
      talk,
      existingRating,
      questionSent,
      isAdmin: await isAdmin(ctx),
    });
  });

  const PostQuestionBodyModel = type({
    question: string(),
  });

  router.post("/talk/:slug/question", async (ctx) => {
    const talk = await talkStore.findBySlug(ctx.params.slug);
    if (!talk) {
      ctx.response.status = 404;
      return;
    }
    const bodyReader = ctx.request.body({ type: "form-data" });
    const body = (await bodyReader.value.read()).fields;
    assert(body, PostQuestionBodyModel);
    const visitorId = await getVisitorId(ctx);
    await questionStore.saveQuestion({
      talk_id: talk.id,
      visitor_id: visitorId,
      question: body.question,
    });
    ctx.response.redirect(`/talk/${talk.slug}?q=1`);
  });

  const PostRatingBodyModel = type({
    rating: string(),
    comment: string(),
  });

  router.post("/talk/:slug/rating", async (ctx) => {
    const talk = await talkStore.findBySlug(ctx.params.slug);
    if (!talk) {
      ctx.response.status = 404;
      return;
    }
    const bodyReader = ctx.request.body({ type: "form-data" });
    const body = (await bodyReader.value.read()).fields;
    assert(body, PostRatingBodyModel);
    const visitorId = await getVisitorId(ctx);
    const rating = parseInt(body.rating);
    if (rating < 1 || rating > 5) {
      ctx.response.status = 400;
      return;
    }
    await ratingStore.saveRating({
      talk_id: talk.id,
      visitor_id: visitorId,
      rating,
      comment: body.comment,
    });
    ctx.response.redirect(`/talk/${talk.slug}`);
  });
};
