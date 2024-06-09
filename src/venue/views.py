from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.postgres.aggregates import ArrayAgg

from venue.models import Question, Rating, Speaker, Talk


def index(request):
    talks = (
        Talk.objects.all()
        .annotate(speakers_names=ArrayAgg("speakers__name"))
        .values("name", "slug", "date", "track__name", "speakers_names")
    )
    return render(request, "venue/index.html", {"talks": talks})


def talk(request, slug):
    talk = (
        Talk.objects.filter(slug=slug)
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
        talk = Talk.objects.filter(slug=slug).first()
        question = request.POST.get("question")
        Question.objects.create(talk=talk, question=question).save()
        messages.add_message(request, messages.INFO, "¡Gracias por su pregunta!")
        return redirect("talk", slug, permanent=False)


def talk_rating(request, slug):
    if request.method == "POST":
        talk = Talk.objects.filter(slug=slug).first()
        rating = int(request.POST.get("rating"))
        comment = request.POST.get("comment")
        Rating.objects.create(talk=talk, rating=rating, comment=comment).save()
        messages.add_message(request, messages.INFO, "¡Gracias por su valoración!")
        return redirect("talk", slug, permanent=False)
