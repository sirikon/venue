from django.db.models.manager import BaseManager

from venue.domain.visitor_context import VisitorContext
from venue_django_app.models import Visitor


class VisitorService:

    def __init__(
        self, *, visitor_context: VisitorContext, visitor_manager: BaseManager[Visitor]
    ):
        self.__visitor_context = visitor_context
        self.__visitor_manager = visitor_manager

    def get_or_create(self) -> Visitor:
        visitor_id = self.__visitor_context.get()
        visitor, _ = self.__visitor_manager.get_or_create(id=visitor_id)
        return visitor
