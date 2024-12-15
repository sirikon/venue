import constance.settings
from django.http import HttpRequest
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.contrib.postgres.aggregates import ArrayAgg
from django.http.request import split_domain_port
from django.core.exceptions import BadRequest

from venue.models import Question, Rating, Speaker, Talk, Visitor


def get_domain(request):
    domain, _ = split_domain_port(request.get_host())
    return domain


def get_talk_query(slug):
    return Talk.objects.filter(slug=slug)


@login_required
def login(_: HttpRequest):
    return redirect("index", permanent=False)


def logout(request: HttpRequest):
    session_data_to_keep = [
        (k, request.session.get(k))
        for k in request.session.keys()
        if k == "visitor_id" or k.startswith("talk_rated_")
    ]
    auth_logout(request)
    for key, value in session_data_to_keep:
        request.session[key] = value
    return redirect("index", permanent=False)


def index(request: HttpRequest):
    talks = (
        Talk.objects.order_by("date")
        .annotate(
            speakers_names=ArrayAgg("speakers__name", ordering=("speakers__name"))
        )
        .values(
            "pk",
            "name",
            "slug",
            "date",
            "display_date",
            "track__name",
            "speakers_names",
        )
    )
    talks = [
        {**talk, "rated": request.session.get("talk_rated_" + str(talk["pk"]), False)}
        for talk in talks
    ]
    return render(request, "venue/index.html", {"talks": talks})


def talk(request: HttpRequest, slug):
    talk = (
        get_talk_query(slug)
        .annotate(
            speakers_ids=ArrayAgg("speakers"),
        )
        .values(
            "pk",
            "name",
            "slug",
            "date",
            "display_date",
            "track__name",
            "description",
            "speakers_ids",
            "enable_questions",
            "enable_ratings",
        )
        .first()
    )
    talk["speakers"] = (
        Speaker.objects.filter(pk__in=talk["speakers_ids"])
        .order_by("name", "title")
        .values("name", "title", "biography", "image")
    )
    return render(
        request,
        "venue/talk.html",
        {
            "talk": talk,
            "talk_rated": request.session.get("talk_rated_" + str(talk["pk"]), False),
        },
    )


def talk_question(request, slug):
    if request.method == "POST":
        question = request.POST.get("question")
        if question is None:
            raise BadRequest()
        if question.strip() == "":
            return redirect("talk", slug, permanent=False)

        visitor, _ = Visitor.objects.get_or_create(id=request.session["visitor_id"])
        talk = get_talk_query(slug).first()
        Question.objects.create(talk=talk, question=question, visitor=visitor).save()
        messages.add_message(request, messages.SUCCESS, "¡Gracias por su pregunta!")
        return redirect("talk", slug, permanent=False)


@login_required
def talk_questions(request: HttpRequest, slug: str):
    if request.method == "GET":
        talk = (
            get_talk_query(slug)
            .annotate(
                speakers_ids=ArrayAgg("speakers"),
            )
            .values(
                "pk",
                "name",
                "slug",
                "date",
                "display_date",
                "track__name",
                "enable_questions",
            )
            .first()
        )
        questions = Question.objects.filter(talk__pk=talk["pk"]).values(
            "pk",
            "question",
        )
        return render(
            request,
            "venue/talk_questions.html",
            {"talk": talk, "questions": questions},
        )


def talk_rating(request, slug):
    if request.method == "POST":
        rating = int(request.POST.get("rating"))
        comment = request.POST.get("comment")
        if rating is None or comment is None:
            raise BadRequest()
        if rating < 1 or rating > 5:
            raise BadRequest()
        if len(comment) > 600:
            raise BadRequest()

        visitor, _ = Visitor.objects.get_or_create(id=request.session["visitor_id"])
        talk = get_talk_query(slug).first()
        Rating.objects.create(
            talk=talk, rating=rating, comment=comment, visitor=visitor
        ).save()
        request.session["talk_rated_" + str(talk.pk)] = True
        return redirect("talk", slug, permanent=False)


@login_required
def talk_ratings(request: HttpRequest, slug: str):
    if request.method == "GET":
        talk = (
            get_talk_query(slug)
            .annotate(
                speakers_ids=ArrayAgg("speakers"),
            )
            .values(
                "pk",
                "name",
                "slug",
                "date",
                "display_date",
                "track__name",
                "enable_ratings",
            )
            .first()
        )
        ratings = Rating.objects.filter(talk__pk=talk["pk"]).values(
            "comment",
            "rating",
        )

        summary = {
            "max": 5,
            "average": 0,
            "stars_per_rating": [
                [True],
                [True, True],
                [True, True, True],
                [
                    True,
                    True,
                    True,
                    True,
                ],
                [
                    True,
                    True,
                    True,
                    True,
                    True,
                ],
            ],
            "count_per_rating": [0, 0, 0, 0, 0],
        }

        if len(ratings) > 0:
            total = 0
            for rating in ratings:
                total += rating["rating"]
                summary["count_per_rating"][rating["rating"] - 1] += 1
            summary["average"] = total / len(ratings)

        return render(
            request,
            "venue/talk_ratings.html",
            {
                "talk": talk,
                "ratings": [r for r in ratings if r["comment"] != ""],
                "summary": summary,
            },
        )
