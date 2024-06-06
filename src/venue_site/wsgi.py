# https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'venue_site.settings')

application = get_wsgi_application()
