FROM debian:bullseye-slim AS build
# Install dependencies
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    python3 curl git unzip ca-certificates bash \
  && update-ca-certificates

# ASDF
RUN git clone --branch v0.10.2 --depth 1 https://github.com/asdf-vm/asdf.git /asdf
SHELL ["/bin/bash", "--rcfile", "/asdf/asdf.sh", "-ci"]
RUN asdf plugin add deno
RUN asdf plugin add nodejs
# Build everything
WORKDIR /app
COPY .tool-versions .
RUN asdf install
COPY ./modules/server ./modules/server
COPY scripts/ ./scripts
COPY task .
RUN ./task build

# Final stage
FROM debian:bullseye-slim
COPY --from=build /app/dist /app
WORKDIR /app
CMD ./venue
