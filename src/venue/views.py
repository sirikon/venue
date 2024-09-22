from django.http import HttpRequest
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.postgres.aggregates import ArrayAgg
from django.http.request import split_domain_port
from django.core.exceptions import BadRequest

from venue.models import Question, Rating, Speaker, Talk, Visitor


def get_domain(request):
    domain, _ = split_domain_port(request.get_host())
    return domain


def get_talk_query(slug):
    return Talk.objects.filter(slug=slug)


def index(request):
    talks = (
        Talk.objects.order_by("date")
        .annotate(speakers_names=ArrayAgg("speakers__name"))
        .values("name", "slug", "date", "track__name", "speakers_names")
    )
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
            "track__name",
            "description",
            "speakers_ids",
        )
        .first()
    )
    talk["speakers"] = Speaker.objects.filter(pk__in=talk["speakers_ids"]).values(
        "name", "title", "image"
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
        messages.add_message(request, messages.INFO, "¡Gracias por su pregunta!")
        return redirect("talk", slug, permanent=False)


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
