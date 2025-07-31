from contextvars import ContextVar


class VisitorContext:

    def __init__(self):
        self.__contextvar = ContextVar[str]("visitor", default=None)

    def set(self, visitor_id: str):
        if self.__contextvar.get() is not None:
            raise Exception("Setting visitor_id failed because it is already defined")
        self.__contextvar.set(visitor_id)

    def get(self):
        return self.__contextvar.get()
