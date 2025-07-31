from venue.application.talk_question_creation_command import TalkQuestionCreationCommand
from venue.application.talk_rating_creation_command import TalkRatingCreationCommand
from venue.domain.visitor_context import VisitorContext
from venue.domain.visitor_service import VisitorService
from venue.infrastructure.django_request_context import DjangoRequestContext
from venue.infrastructure.django_visitor_talk_rating_service import (
    DjangoVisitorTalkRatingService,
)
from venue_django_app.models import Rating, Talk, Visitor, Question

django_request_context = DjangoRequestContext()
visitor_context = VisitorContext()
visitor_service = VisitorService(
    visitor_context=visitor_context, visitor_manager=Visitor.objects
)
visitor_talk_rating_service = DjangoVisitorTalkRatingService(
    django_request_context=django_request_context
)
talk_question_creation_command = TalkQuestionCreationCommand(
    visitor_service=visitor_service,
    talk_manager=Talk.objects,
    question_manager=Question.objects,
)
talk_rating_creation_command = TalkRatingCreationCommand(
    visitor_service=visitor_service,
    visitor_talk_rating_service=visitor_talk_rating_service,
    talk_manager=Talk.objects,
    rating_manager=Rating.objects,
)
