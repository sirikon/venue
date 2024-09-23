from django import template
from django.conf import settings
from django.http import HttpRequest

register = template.Library()


@register.simple_tag(takes_context=True)
def media_url(context: dict, url: str):
    request: HttpRequest = context["request"]
    return request.build_absolute_uri(settings.MEDIA_URL + url)
