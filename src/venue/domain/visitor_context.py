from contextvars import ContextVar


VISITOR_CONTEXTVAR = ContextVar[str]("visitor", default=None)


class VisitorContext:
    def set(self, visitor_id: str):
        if VISITOR_CONTEXTVAR.get() is not None:
            raise Exception("Setting visitor_id failed because it is already defined")
        VISITOR_CONTEXTVAR.set(visitor_id)

    def get(self):
        return VISITOR_CONTEXTVAR.get()
