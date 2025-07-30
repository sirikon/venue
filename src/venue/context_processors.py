from constance.utils import get_values
from venue_django.settings import VENUE_VERSION


def config(_):
    return {"config": get_values()}


def version(_):
    return {"VERSION": VENUE_VERSION}
