FROM ubuntu:20.04 AS build
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y python3 curl git unzip ca-certificates
RUN update-ca-certificates
RUN git clone https://github.com/asdf-vm/asdf.git /asdf --branch v0.9.0

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
