FROM python:3.12.3-slim AS builder
RUN apt-get update && apt-get install -y curl xz-utils

# Poetry
ENV POETRY_VERSION="1.8.3"
ENV POETRY_INSTALLER_COMMIT="d62875fc05fb20062175cd14d19a96dbefa48640"
ENV POETRY_HOME=/poetry
ENV PATH="/poetry/bin:${PATH}"
RUN curl -fsSL "https://raw.githubusercontent.com/python-poetry/install.python-poetry.org/${POETRY_INSTALLER_COMMIT}/install-poetry.py" | python -
RUN poetry config virtualenvs.create true
RUN poetry config virtualenvs.in-project true

WORKDIR /app
ADD pyproject.toml .
ADD poetry.lock .
RUN poetry install
ADD ./src ./src

FROM python:3.12.3-slim AS release
COPY --from=builder /app /app
WORKDIR /app
