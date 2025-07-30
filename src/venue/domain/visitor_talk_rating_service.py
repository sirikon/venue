from abc import ABC, abstractmethod


class VisitorTalkRatingService(ABC):
    @abstractmethod
    def has_rated(self, talk_id: int):
        pass

    @abstractmethod
    def flag_rated(self, talk_id: int):
        pass
