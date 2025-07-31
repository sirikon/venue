from abc import ABC, abstractmethod

from venue_django_app.models import Visitor


class VisitorService(ABC):

    @abstractmethod
    def get_or_create(self) -> Visitor:
        pass
