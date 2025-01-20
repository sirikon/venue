# Venue

_(a.k.a. **BilboStack App**)_

Provide tools to event organizers. Including:

- Talk listing with details.
- Talk rating with comments.
  - A summary page for each talk with all the ratings and an average.
- Talk question submission.
  - Questions can be seen by event organizers.
- A backoffice to manage everything.

## Branches

This project underwent many versions and rewrites. Here's a quick guide:

- Currently developed branch is `master`.
- An old version based on Deno is in branch `old/deno`.
- An older version based on Node is in branch `old/node`.
- Custom versions for past events are in `custom/*` branches.

## Development

Requires Docker and assumes that all the tools listed in [.tool-versions](./.tool-versions) are installed.

```bash
./meta/setup.sh
./meta/start.sh
```
