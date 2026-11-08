# MeshContinuum presentation site

The public front page for MeshContinuum. It is built into one static, versioned artifact, which a deployment such as mecon.cloud serves as its front page. How a deployment consumes it is in the [integration contract](CONTRACT.md).

## Layout

| Path | What it is |
|---|---|
| `src/index.html` | The page. `{{ASSET}}` and `{{VERSION}}` are filled in at build time |
| `src/style.css`, `src/site.js` | Styles, and the small script that reads the instance's name and sign-in link |
| `src/preview/` | Screenshots of the Reader |
| `src/*.png` | Icons |
| `VERSION` | The site version. It is independent of Backend and firmware versions |
| `build.py` | Builds `dist/`: the page, the assets, `site.json`, the tarball and `SHA256SUMS` |

## Build and preview

```sh
python3 site/build.py --dev
cd site/dist && perl -e 'alarm shift; exec @ARGV' 1800 python3 -m http.server 8800 --bind 127.0.0.1
```

Open `http://127.0.0.1:8800/`. A release build, without `--dev`, refuses uncommitted changes under `site/`.

## Releasing

1. Bump `VERSION`, and merge the change.
2. On that commit of `main`, run `python3 site/build.py`. Note the tarball sha256 and the tree digest it prints.
3. Create the release `site-vX.Y.Z` from that commit, with `dist/meshcontinuum-site-X.Y.Z.tar.gz` and `dist/SHA256SUMS` attached. Put the source commit, the tarball sha256 and the tree digest in the notes.
4. Tell the consumer. It pins the release by itself, per the contract.

A published release is never edited or replaced. A fix is a new version.

## What belongs here

Only public-safe presentation: copy, styles, icons and screenshots. Never sign-in or session code, Reader or Backend source, configuration, credentials, or any instance's names and addresses. Copy follows the [maintainer brief](../docs/PRODUCT_MESSAGING.md), and says nothing about availability beyond the one notice that links to [availability](../docs/CAPABILITIES.md).

## Provenance

The page, its styles, its icons and its diagram were taken from the hosted service's front page, written by the same author. That page's sign-in panel and its script stayed with the service. The screenshots were captured on 9 October 2026 in the real application, on a build whose Reader shows v0.193.0, with synthetic demo data. They are the same files as in `docs/images/`. Licensed with this repository under [Apache-2.0](../LICENSE).
