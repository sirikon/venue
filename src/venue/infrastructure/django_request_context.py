from contextvars import ContextVar

from django.http import HttpRequest

DJANGO_REQUEST_CONTEXTVAR = ContextVar[HttpRequest]("django_request", default=None)


class DjangoRequestContext:

    def set(self, request: HttpRequest):
        if DJANGO_REQUEST_CONTEXTVAR.get() is not None:
            raise Exception("Setting request failed because it is already defined")
        DJANGO_REQUEST_CONTEXTVAR.set(request)

    def get(self):
        return DJANGO_REQUEST_CONTEXTVAR.get()
