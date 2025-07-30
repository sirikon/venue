# https://docs.djangoproject.com/en/5.0/ref/settings/
from os import getcwd, environ
from pathlib import Path
from collections import OrderedDict

VENUE_VERSION = environ.get("VENUE_VERSION", "dev")
VENUE_DEBUG = environ.get("VENUE_DEBUG", "false").lower() == "true"
VENUE_FIXTURES = environ.get("VENUE_FIXTURES")
VENUE_DB_NAME = environ.get("VENUE_DB_NAME", "venue")
VENUE_DB_USER = environ.get("VENUE_DB_USER", "venue")
VENUE_DB_PASSWORD = environ.get("VENUE_DB_PASSWORD", "venue")
VENUE_DB_HOST = environ.get("VENUE_DB_HOST", "127.0.0.1")
VENUE_DB_PORT = int(environ.get("VENUE_DB_PORT", "5432"))
VENUE_DB_CONN_MAX_AGE = int(environ.get("VENUE_DB_CONN_MAX_AGE", "3600"))

if VENUE_DEBUG:
    VENUE_SECRET_KEY = environ.get("VENUE_SECRET_KEY", "secret")
    VENUE_DISABLE_SECURE_COOKIES = True
else:
    VENUE_SECRET_KEY = environ.get("VENUE_SECRET_KEY")
    if VENUE_SECRET_KEY is None:
        raise ValueError("VENUE_SECRET_KEY is required")
    VENUE_DISABLE_SECURE_COOKIES = (
        environ.get("VENUE_DISABLE_SECURE_COOKIES", "false").lower() == "true"
    )

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

CWD = Path(getcwd()).resolve()
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = VENUE_SECRET_KEY
DEBUG = VENUE_DEBUG

LOGIN_URL = "/admin/login/"

INTERNAL_IPS = (
    [
        "127.0.0.1",
    ]
    if VENUE_DEBUG
    else []
)

ALLOWED_HOSTS = ["*"]
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

MEDIA_ROOT = CWD / "media"
MEDIA_URL = "/media/"

FIXTURE_DIRS = [*([VENUE_FIXTURES] if VENUE_FIXTURES is not None else [])]

# Application definition

INSTALLED_APPS = [
    "venue_django_app.apps.VenueConfig",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_prose_editor",
    "constance",
    *(["debug_toolbar"] if VENUE_DEBUG else []),
]

CONSTANCE_BACKEND = "constance.backends.database.DatabaseBackend"
CONSTANCE_CONFIG = {
    "EVENT_NAME": (
        "Event Name",
        "The full name of the event",
    ),
    "EVENT_DESCRIPTION": ("", "Description for metadata"),
    "EVENT_YEAR": (0, "Year of the event", int),
    "HEADER_IMAGE": ("", "Header image", "image"),
    "LANG": ("en", "Language (ISO code)"),
    "BEFORE_TALK_LIST": (
        "<p></p>",
        "Content block that goes before all the items in the index",
        "prose",
    ),
    "AFTER_TALK_LIST": (
        "<p></p>",
        "Content block that goes after all the items in the index",
        "prose",
    ),
    "EXTRA_CSS": ("", "Custom CSS"),
    "EXTRA_JS": ("", "Custom JS"),
}
CONSTANCE_ADDITIONAL_FIELDS = {
    "image": [
        "django.forms.ImageField",
        {
            "widget": "venue_django_app.widgets.ActuallyClearableFileInput",
            "required": False,
        },
    ],
    "prose": ["django_prose_editor.fields.ProseEditorFormField", {}],
}
CONSTANCE_CONFIG_FIELDSETS = OrderedDict(
    [
        ("Brand", ("EVENT_NAME", "EVENT_DESCRIPTION", "EVENT_YEAR", "HEADER_IMAGE")),
        ("Content", ("LANG", "BEFORE_TALK_LIST", "AFTER_TALK_LIST")),
        ("UI", ("EXTRA_CSS", "EXTRA_JS")),
    ]
)


CSRF_COOKIE_SECURE = not VENUE_DISABLE_SECURE_COOKIES
SESSION_COOKIE_SECURE = not VENUE_DISABLE_SECURE_COOKIES

MIDDLEWARE = [
    *(["debug_toolbar.middleware.DebugToolbarMiddleware"] if VENUE_DEBUG else []),
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "venue_django_app.middleware.contextvar_middleware",
    "venue_django_app.middleware.visitor_middleware",
]

MESSAGE_STORAGE = "django.contrib.messages.storage.session.SessionStorage"

ROOT_URLCONF = "venue_django.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "venue_django_app.context_processors.config",
                "venue_django_app.context_processors.version",
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "venue_django.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": VENUE_DB_NAME,
        "USER": VENUE_DB_USER,
        "PASSWORD": VENUE_DB_PASSWORD,
        "HOST": VENUE_DB_HOST,
        "PORT": VENUE_DB_PORT,
        "CONN_MAX_AGE": VENUE_DB_CONN_MAX_AGE,
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = "static/"
STATIC_ROOT = "static"

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

SILENCED_SYSTEM_CHECKS = [
    "security.W004",
    "security.W008",
    *(["security.W012", "security.W016"] if VENUE_DISABLE_SECURE_COOKIES else []),
]

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "WARNING",
    },
}
