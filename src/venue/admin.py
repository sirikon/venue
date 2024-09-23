from django.contrib import admin
from .models import Talk, Speaker, Track, Visitor, Rating, Question


admin.site.site_header = "Venue"
admin.site.site_title = "Venue"
admin.site.index_title = "Administration"


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
