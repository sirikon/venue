from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.postgres.aggregates import ArrayAgg

from venue.models import Talk


def index(request):
    talks = (
        Talk.objects.all()
        .annotate(speakers_names=ArrayAgg("speakers__name"))
        .values("name", "date", "track__name", "speakers_names")
    )
    return render(request, "venue/index.html", {"talks": talks})
