# https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/

import os

from django.core.wsgi import get_wsgi_application
from django.urls import get_resolver

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "venue_django.settings")

application = get_wsgi_application()
get_resolver().url_patterns
