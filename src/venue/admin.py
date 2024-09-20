from django.contrib import admin
from constance import config
from constance.signals import config_updated
from django.dispatch import receiver
from .models import Talk, Speaker, Track, Visitor, Rating, Question


@receiver(config_updated)
def constance_updated(*args, **kwargs):
    set_admin_titles()


def set_admin_titles():
    admin.site.site_header = config.EVENT_NAME
    admin.site.site_title = config.EVENT_NAME
    admin.site.index_title = "Administration"


set_admin_titles()


@admin.register(Talk)
class TalkAdmin(admin.ModelAdmin):
    list_display = ["name", "track", "date", "description"]
    list_editable = ["track", "date", "description"]


admin.site.register(Speaker)
admin.site.register(Track)
admin.site.register(Rating)
admin.site.register(Visitor)


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_filter = ["talk"]
    list_display = ["question", "talk"]
