from django.urls import path

from . import views

urlpatterns = [
    path("login", views.login, name="login"),
    path("logout", views.logout, name="logout"),
    path("", views.index, name="index"),
    path("talk/<str:slug>", views.talk, name="talk"),
    path("talk/<str:slug>/question", views.talk_question, name="talk_question"),
    path("talk/<str:slug>/questions", views.talk_questions, name="talk_questions"),
    path("talk/<str:slug>/rating", views.talk_rating, name="talk_rating"),
    path("talk/<str:slug>/ratings", views.talk_ratings, name="talk_ratings"),
]
