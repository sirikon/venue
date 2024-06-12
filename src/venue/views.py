from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.postgres.aggregates import ArrayAgg
from django.http.request import split_domain_port

from venue.models import Question, Rating, Speaker, Talk, Event


def get_domain(request):
    domain, _ = split_domain_port(request.get_host())
    return domain


def get_event(request):
    return Event.objects.filter(domain=get_domain(request)).values("id", "name").first()


def get_talk_query(event, slug):
    return Talk.objects.filter(slug=slug, track__event_id=event["id"])


def index(request):
    event = get_event(request)
    talks = (
        Talk.objects.filter(track__event_id=event["id"])
        .annotate(speakers_names=ArrayAgg("speakers__name"))
        .values("name", "slug", "date", "track__name", "speakers_names")
    )
    return render(request, "venue/index.html", {"talks": talks})


def talk(request, slug):
    talk = (
        get_talk_query(get_event(request), slug)
        .annotate(
            speakers_ids=ArrayAgg("speakers"),
        )
        .values(
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
    return render(request, "venue/talk.html", {"talk": talk})


def talk_question(request, slug):
    if request.method == "POST":
        talk = get_talk_query(get_event(request), slug).first()
        question = request.POST.get("question")
        Question.objects.create(talk=talk, question=question).save()
        messages.add_message(request, messages.INFO, "¡Gracias por su pregunta!")
        return redirect("talk", slug, permanent=False)


def talk_rating(request, slug):
    if request.method == "POST":
        talk = get_talk_query(get_event(request), slug).first()
        rating = int(request.POST.get("rating"))
        comment = request.POST.get("comment")
        Rating.objects.create(talk=talk, rating=rating, comment=comment).save()
        messages.add_message(request, messages.INFO, "¡Gracias por su valoración!")
        return redirect("talk", slug, permanent=False)
