from django.contrib import admin
from .models import Talk, Speaker, Track

admin.site.register(Talk)
admin.site.register(Speaker)
admin.site.register(Track)
