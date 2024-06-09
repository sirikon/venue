from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("talk/<str:slug>", views.talk, name="talk"),
    path("talk/<str:slug>/question", views.talk_question, name="talk_question"),
    path("talk/<str:slug>/rating", views.talk_rating, name="talk_rating"),
]
