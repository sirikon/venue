ARG PYTHON_VERSION='0.0.0'

# Builder
FROM python:${PYTHON_VERSION}-slim AS builder
WORKDIR /w
RUN apt-get update && apt-get install -y curl xz-utils

# Caddy
FROM builder AS caddy-downloader
ENV CADDY_VERSION=2.8.4
ENV CADDY_CHECK=d3491373b2d78e4eaa3f498b42852d399d404b0df3f274bbee66d62c12084be0
RUN printf "%s\n" "${CADDY_CHECK}  caddy" >caddy.sha256
RUN curl -L --output caddy.tar.gz "https://github.com/caddyserver/caddy/releases/download/v${CADDY_VERSION}/caddy_${CADDY_VERSION}_linux_amd64.tar.gz"
RUN tar -xvzf caddy.tar.gz
#RUN sha256sum caddy && exit 1
RUN sha256sum -c caddy.sha256

# App Builder
FROM builder AS app-builder
## Poetry
ARG POETRY_VERSION='0.0.0'
ENV POETRY_VERSION="${POETRY_VERSION}"
ENV POETRY_INSTALLER_COMMIT="d62875fc05fb20062175cd14d19a96dbefa48640"
ENV POETRY_HOME=/poetry
ENV PATH="/poetry/bin:${PATH}"
RUN curl -fsSL "https://raw.githubusercontent.com/python-poetry/install.python-poetry.org/${POETRY_INSTALLER_COMMIT}/install-poetry.py" | python -
RUN poetry config virtualenvs.create true
RUN poetry config virtualenvs.in-project true
## App
WORKDIR /app
ADD pyproject.toml .
ADD poetry.lock .
RUN poetry install
ADD ./src ./src

# Release
FROM python:${PYTHON_VERSION}-slim AS release
SHELL [ "/bin/bash", "-c" ]
RUN apt-get -y update &&  \ 
    apt-get install --no-install-recommends  \
    -y curl && \
    rm -rf /var/lib/apt/lists/*
COPY --from=caddy-downloader /w/caddy /usr/local/bin/caddy
COPY ./meta/docker/_/Caddyfile /proxy/Caddyfile
COPY ./meta/docker/_/bin/* /usr/local/bin
RUN useradd --system --create-home --shell /bin/false venue
ENTRYPOINT []
CMD ["venue"]
HEALTHCHECK --start-period=30s --timeout=1s --start-interval=1s CMD [ "venue-ready" ]
COPY --from=app-builder /app/.venv /app/.venv
COPY --from=app-builder /app/src /app/src
WORKDIR /app
RUN VENUE_DEBUG=true ./.venv/bin/python ./src/manage.py collectstatic --no-input
USER venue
WORKDIR /w
