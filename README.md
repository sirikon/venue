# BilboStack App

(a.k.a. Venue)

ℹ️ _Old version of the project is in branch `old`_.

ℹ️ _Custom versions for past events are in `custom/*` branches_.

This software is intended to provide tools to event organizers. Including:

- Talk listing with details.
- Talk rating with comments.
- Talk question submission. Questions can be seen by event organizers.

## Requirements

[ASDF](https://asdf-vm.com/) is recommended for getting the correct version of
most of the dependencies.

If not using ASDF, check dependencies versions in [.tool-versions](./.tool-versions).

- Deno (backend).
- Docker (development environment and building Docker releases).

Also the [task](./task) file is used to work with the project and is written
with **Python 3**. It's an extra dependency just for that, but you probably have it
installed already.

## Development

```bash
# Spin up a development environment
./task devenv_up
# Run the application
./task run
# Formatter and linter
./task fmt
./task lint
# Build locally or using docker
./task build
./task build_docker
```
