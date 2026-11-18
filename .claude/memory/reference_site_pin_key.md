---
name: reference-site-pin-key
description: How this repo's coder puts a site release live on mecon.cloud (F2 forced-command pin key, path and scope only)
metadata:
  type: reference
---

The mecon.cloud front page (`/` and `/site/**`) is served by F2's Caddy from a
pinned site release on disk (hoejriis/github-backup#275, PR #276, live
2026-11-18). This repo's coder pins it directly; the deimos-mesh session is
not involved.

- **Key:** `~/.ssh/meshcontinuum-site-pin` (ed25519, mode 600, created
  2026-11-18 on the owner's laptop). The private half is never copied, pasted
  or put in a subagent's charge.
- **Use:** `ssh f2-site-pin status` and
  `ssh f2-site-pin pin site-vX.Y.Z <tarball sha256 from the release notes>`.
  The `f2-site-pin` alias is in `~/.ssh/config` (user `mecon-site` on F2).
- **Scope:** a forced command (`/usr/local/bin/site-pin`). It accepts only
  those two commands; anything else is refused and logged. It cannot touch
  Caddy's config, the app or any other path.
- **Rollback:** `pin <earlier tag> <its sha256>`. An installed release is
  re-verified without downloading it again. If a pin breaks the page and
  rollback fails, cirion (github-backup's coder) removes `current`, which
  brings back the app's own page.
- **After every pin:** run the site contract's joint check (section 8) against
  live mecon.cloud. An hourly root re-check removes `current` on a digest
  mismatch and alerts through Monit.
