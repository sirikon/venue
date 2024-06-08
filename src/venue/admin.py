from django.contrib import admin
from .models import Talk, Speaker, Track, Rating, Question

admin.site.register(Talk)
admin.site.register(Speaker)
admin.site.register(Track)
admin.site.register(Rating)
admin.site.register(Question)
