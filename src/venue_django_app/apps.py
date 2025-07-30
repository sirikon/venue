from django.apps import AppConfig


class VenueConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "venue_django_app"
    label = "venue"
    verbose_name = "Venue"
