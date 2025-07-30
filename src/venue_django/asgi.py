# https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "venue_django.settings")

application = get_asgi_application()
