ARG PYTHON_VERSION='0.0.0'

# Builder
FROM python:${PYTHON_VERSION}-slim AS builder
WORKDIR /w
RUN apt-get update && apt-get install -y curl xz-utils

# Caddy
FROM builder AS caddy-downloader
ENV CADDY_VERSION=2.10.0
ENV CADDY_CHECK=ae87f566523d744731c0832d97b009b5cbdd69f5825e6e3c7de380c295a4ef68
RUN printf "%s\n" "${CADDY_CHECK}  caddy" >caddy.sha256
RUN curl -L --output caddy.tar.gz "https://github.com/caddyserver/caddy/releases/download/v${CADDY_VERSION}/caddy_${CADDY_VERSION}_linux_amd64.tar.gz"
RUN tar -xvzf caddy.tar.gz
## Uncomment to display sha256 sum
# RUN sha256sum caddy && exit 1
RUN sha256sum -c caddy.sha256

# App Builder
FROM builder AS app-builder
WORKDIR /app
## Poetry
ADD ./meta/poetry.sh ./meta/poetry.sh
RUN ./meta/poetry.sh --version
# App
ADD pyproject.toml .
ADD poetry.lock .
RUN ./meta/poetry.sh install
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
ENV PYTHONUNBUFFERED=1
ARG VENUE_VERSION
ENV VENUE_VERSION=${VENUE_VERSION}
