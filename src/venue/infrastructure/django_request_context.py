from contextvars import ContextVar

from django.http import HttpRequest


class DjangoRequestContext:

    def __init__(self):
        self.__contextvar = ContextVar[HttpRequest]("django_request", default=None)

    def set(self, request: HttpRequest):
        if self.__contextvar.get() is not None:
            raise Exception("Setting request failed because it is already defined")
        self.__contextvar.set(request)

    def get(self):
        return self.__contextvar.get()
