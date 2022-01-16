import { Router } from "oak/mod.ts";
import { render } from "../templates/mod.ts";
import { talkStore } from "../services/infrastructure/TalkStore.ts";
import { assert, integer, string, type } from "denox/superstruct/index.ts";
import { getVisitorId } from "./visitor.ts";
import { questionStore } from "../services/infrastructure/QuestionStore.ts";
import { ratingStore } from "../services/infrastructure/RatingStore.ts";

export default (router: Router) => {
  router.get("/", async (ctx) => {
    const talks = await talkStore.findAll();
    ctx.response.body = await render("index.html", { talks });
  });

  router.get("/talk/:slug", async (ctx) => {
    const talk = await talkStore.findBySlug(ctx.params.slug);
    if (!talk) {
      ctx.response.status = 404;
      return;
    }
    ctx.response.body = await render("talk.html", { talk });
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
    ctx.response.redirect(`/talk/${talk.slug}`);
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
