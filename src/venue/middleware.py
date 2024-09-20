from uuid import uuid4
from django.http import HttpRequest


def visitor_middleware(get_response):
    def middleware(request: HttpRequest):
        if "visitor_id" not in request.session:
            request.session["visitor_id"] = uuid4().hex
        return get_response(request)

    return middleware
