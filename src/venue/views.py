from django.shortcuts import render
from django.contrib.postgres.aggregates import ArrayAgg

from venue.models import Speaker, Talk


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
    print(talk)
    return render(request, "venue/talk.html", {"talk": talk})


def talk_question(request):
    pass


def talk_rating(request):
    pass
