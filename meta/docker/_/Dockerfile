ARG PYTHON_VERSION='0.0.0'

# Builder
FROM python:${PYTHON_VERSION}-slim AS builder
WORKDIR /w
RUN apt-get update && apt-get install -y curl xz-utils

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
