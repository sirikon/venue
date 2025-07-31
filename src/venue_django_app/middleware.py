from contextvars import copy_context

from uuid import uuid4
from django.http import HttpRequest

from venue import ioc


def contextvar_middleware(get_response):
    def middleware(request: HttpRequest):
        ctx = copy_context()
        return ctx.run(get_response, request)

    return middleware


def request_context_middleware(get_response):
    def middleware(request: HttpRequest):
        ioc.django_request_context.set(request)
        return get_response(request)

    return middleware


def visitor_middleware(get_response):
    def middleware(request: HttpRequest):
        if "visitor_id" not in request.session:
            request.session["visitor_id"] = uuid4().hex
        ioc.visitor_context.set(request.session["visitor_id"])
        return get_response(request)

    return middleware
