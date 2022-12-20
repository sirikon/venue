import { Router } from "oak/mod.ts";
import { getQuery } from "oak/helpers.ts";
import { getVisitorId } from "@/web/visitor.ts";
import { AdminController } from "@/web/AdminController.ts";
import { singleton } from "tsyringe";
import { z } from "zod";
import { Queries } from "@/services/data/Queries.ts";
import { TalkStore } from "@/services/data/TalkStore.ts";
import { RatingStore } from "@/services/data/RatingStore.ts";
import { QuestionStore } from "@/services/data/QuestionStore.ts";
import { TemplateEngine } from "@/services/templates/TemplateEngine.ts";

@singleton()
export class GlobalRouter {
  constructor(
    private adminController: AdminController,
    private queries: Queries,
    private talkStore: TalkStore,
    private ratingStore: RatingStore,
    private questionStore: QuestionStore,
    private templateEngine: TemplateEngine,
  ) {}

  public getRouter() {
    const router = new Router();

    router.get(
      "/admin",
      this.adminController.loginHandler.bind(this.adminController),
    );

    router.get("/talk/:slug/questions", async (ctx) => {
      if (!await this.adminController.isAdmin(ctx)) {
        ctx.response.status = 401;
        return;
      }
      const talk = await this.talkStore.findBySlug(ctx.params.slug);
      if (!talk) {
        ctx.response.status = 404;
        return;
      }
      const questions = await this.queries.talkQuestions(talk);
      ctx.response.body = await this.templateEngine.render(
        "talk_questions.html",
        {
          talk,
          questions,
        },
      );
    });

    router.get("/talk/:slug/ratings", async (ctx) => {
      if (!await this.adminController.isAdmin(ctx)) {
        ctx.response.status = 401;
        return;
      }
      const talk = await this.talkStore.findBySlug(ctx.params.slug);
      if (!talk) {
        ctx.response.status = 404;
        return;
      }
      const ratings = await this.queries.talkRatings(talk);
      ctx.response.body = await this.templateEngine.render(
        "talk_ratings.html",
        {
          talk,
          ratings,
        },
      );
    });

    router.get("/", async (ctx) => {
      const talks = await this.queries.homeTalks(await getVisitorId(ctx));
      ctx.response.body = await this.templateEngine.render("index.html", {
        talks,
        isAdmin: await this.adminController.isAdmin(ctx),
      });
    });

    router.get("/talk/:slug", async (ctx) => {
      const talk = await this.talkStore.findBySlug(ctx.params.slug);
      if (!talk) {
        ctx.response.status = 404;
        return;
      }
      const existingRating = await this.ratingStore.getByTalkAndVisitor({
        talk_id: talk.id,
        visitor_id: await getVisitorId(ctx),
      });
      const questionSent = getQuery(ctx)["q"] === "1";
      ctx.response.body = await this.templateEngine.render("talk.html", {
        talk,
        existingRating,
        questionSent,
        isAdmin: await this.adminController.isAdmin(ctx),
      });
    });

    const PostQuestionBodyModel = z.object({
      question: z.string(),
    });

    router.post("/talk/:slug/question", async (ctx) => {
      const talk = await this.talkStore.findBySlug(ctx.params.slug);
      if (!talk) {
        ctx.response.status = 404;
        return;
      }
      const bodyReader = ctx.request.body({ type: "form-data" });
      const bodyRaw = (await bodyReader.value.read()).fields;
      const body = PostQuestionBodyModel.parse(bodyRaw);
      const visitorId = await getVisitorId(ctx);
      await this.questionStore.saveQuestion({
        talk_id: talk.id,
        visitor_id: visitorId,
        question: body.question,
      });
      ctx.response.redirect(`/talk/${talk.slug}?q=1`);
    });

    const PostRatingBodyModel = z.object({
      rating: z.string(),
      comment: z.string(),
    });

    router.post("/talk/:slug/rating", async (ctx) => {
      const talk = await this.talkStore.findBySlug(ctx.params.slug);
      if (!talk) {
        ctx.response.status = 404;
        return;
      }
      const bodyReader = ctx.request.body({ type: "form-data" });
      const bodyRaw = (await bodyReader.value.read()).fields;
      const body = PostRatingBodyModel.parse(bodyRaw);
      const visitorId = await getVisitorId(ctx);
      const rating = parseInt(body.rating);
      if (rating < 1 || rating > 5) {
        ctx.response.status = 400;
        return;
      }
      await this.ratingStore.saveRating({
        talk_id: talk.id,
        visitor_id: visitorId,
        rating,
        comment: body.comment,
      });
      ctx.response.redirect(`/talk/${talk.slug}`);
    });

    return router;
  }
}
