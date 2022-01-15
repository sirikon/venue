FROM ubuntu:20.04 AS build
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    python3 curl git unzip ca-certificates \
  && update-ca-certificates \
  && rm -rf /var/lib/apt/lists/*

RUN git clone \
  --branch v0.9.0 --depth 1 \
  https://github.com/asdf-vm/asdf.git /asdf
WORKDIR /app

COPY .tool-versions .
RUN bash -c '. /asdf/asdf.sh && asdf plugin add deno'
RUN bash -c '. /asdf/asdf.sh && asdf install'

COPY ./back ./back
COPY task .
RUN bash -c '. /asdf/asdf.sh && ./task build'

FROM ubuntu:20.04
COPY --from=build /app/dist /app
WORKDIR /app
CMD ./venue
