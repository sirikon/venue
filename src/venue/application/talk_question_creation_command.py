from django.db.models.manager import BaseManager

from venue.domain.visitor_service import VisitorService
from venue_django_app.models import Question, Talk


class TalkQuestionCreationCommand:
    def __init__(
        self,
        *,
        visitor_service: VisitorService,
        talk_manager: BaseManager[Talk],
        question_manager: BaseManager[Question],
    ):
        self.__visitor_service = visitor_service
        self.__talk_manager = talk_manager
        self.__question_manager = question_manager

    def handle(self, *, talk_slug: str, question: str):
        talk = self.__talk_manager.filter(slug=talk_slug).first()

        visitor = self.__visitor_service.get_or_create()
        self.__question_manager.create(
            talk=talk, question=question, visitor=visitor
        ).save()
