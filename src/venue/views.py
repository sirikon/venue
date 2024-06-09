from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.postgres.aggregates import ArrayAgg

from venue.models import Talk


def index(request):
    talks = (
        Talk.objects.all()
        .annotate(speakers_names=ArrayAgg("speakers__name"))
        .values("name", "slug", "date", "track__name", "speakers_names")
    )
    return render(request, "venue/index.html", {"talks": talks})


def talk(request, slug):
    talk = Talk.objects.filter(slug=slug).first()
    return render(request, "venue/talk.html", {"talk": talk})


def talk_question(request):
    pass


def talk_rating(request):
    pass
