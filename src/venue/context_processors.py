from django.http.request import split_domain_port
from venue.models import Event


def get_domain(request):
    domain, _ = split_domain_port(request.get_host())
    return domain


def get_event(request):
    return Event.objects.filter(domain=get_domain(request)).values("id", "name").first()


def venue_context_processor(request):
    return {"EVENT": get_event(request)}
