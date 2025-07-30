from venue.application.talk_question_creation_command import TalkQuestionCreationCommand
from venue.application.talk_rating_creation_command import TalkRatingCreationCommand
from venue.domain.visitor_context import VisitorContext
from venue.domain.visitor_service import VisitorService
from venue_django_app.models import Rating, Talk, Visitor, Question

visitor_context = VisitorContext()
visitor_service = VisitorService(
    visitor_context=visitor_context, visitor_manager=Visitor.objects
)
talk_question_creation_command = TalkQuestionCreationCommand(
    visitor_service=visitor_service,
    talk_manager=Talk.objects,
    question_manager=Question.objects,
)
talk_rating_creation_command = TalkRatingCreationCommand(
    visitor_service=visitor_service,
    talk_manager=Talk.objects,
    rating_manager=Rating.objects,
)
