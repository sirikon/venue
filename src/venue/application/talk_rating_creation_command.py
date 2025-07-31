from django.db.models.manager import BaseManager
from django.db import transaction

from venue.domain.visitor_service import VisitorService
from venue.domain.visitor_talk_rating_service import VisitorTalkRatingService
from venue_django_app.models import Rating, Talk


class TalkRatingCreationCommand:

    def __init__(
        self,
        *,
        visitor_service: VisitorService,
        visitor_talk_rating_service: VisitorTalkRatingService,
        talk_manager: BaseManager[Talk],
        rating_manager: BaseManager[Rating],
    ):
        self.__visitor_service = visitor_service
        self.__visitor_talk_rating_service = visitor_talk_rating_service
        self.__talk_manager = talk_manager
        self.__rating_manager = rating_manager

    def handle(self, *, talk_slug: str, rating: int, comment: str):
        talk = self.__talk_manager.filter(slug=talk_slug).first()

        visitor = self.__visitor_service.get_or_create()

        with transaction.atomic():
            self.__rating_manager.create(
                talk=talk, rating=rating, comment=comment, visitor=visitor
            ).save()
            self.__visitor_talk_rating_service.flag_rated(talk_id=talk.id)
