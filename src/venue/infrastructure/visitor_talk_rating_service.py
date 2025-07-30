from venue.domain.visitor_talk_rating_service import VisitorTalkRatingService
from venue.infrastructure.django_request_context import DjangoRequestContext


class DjangoVisitorTalkRatingService(VisitorTalkRatingService):

    def __init__(self, *, django_request_context: DjangoRequestContext):
        self.__django_request_context = django_request_context
        super().__init__()

    def has_rated(self, talk_id: int):
        return self.__django_request_context.get().session["talk_rated_" + str(talk_id)]

    def flag_rated(self, talk_id: int):
        self.__django_request_context.get().session["talk_rated_" + str(talk_id)] = True
