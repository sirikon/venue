# https://docs.djangoproject.com/en/5.0/topics/http/urls/

from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from debug_toolbar.toolbar import debug_toolbar_urls
from . import settings

urlpatterns = (
    [
        path("admin/", admin.site.urls),
        path("", include("venue.urls")),
    ]
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    + debug_toolbar_urls()
)
