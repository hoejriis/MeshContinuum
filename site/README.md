# MeshContinuum presentation site

The public front page for MeshContinuum. It is built into one static, versioned artifact, which a deployment such as mecon.cloud serves as its front page. How a deployment consumes it is in the [integration contract](CONTRACT.md).

## Layout

| Path | What it is |
|---|---|
| `src/index.html` | The page. `{{ASSET}}` and `{{VERSION}}` are filled in at build time |
| `src/style.css`, `src/site.js` | Styles, and the small script that reads the instance's name and sign-in link |
| `src/preview/` | Screenshots of the Reader |
| `src/*.png`, `src/*.svg` | Icons, the header mark and the social preview, copied from `brand/` |
| `src/map/` | The front-page activity map, in demonstration mode: `map.js`, `map.css`, synthetic `fixtures/`, the `basemap.json` outline and a vendored copy of Leaflet. Built only with `--map` |
| `tools/make_basemap.sh` | Rebuilds `basemap.json` from Natural Earth, in a throwaway container |
| `VERSION` | The site version. It is independent of Backend and firmware versions |
| `build.py` | Builds `dist/`: the page, the assets, `site.json`, the tarball and `SHA256SUMS` |

## Build and preview

```sh
python3 site/build.py --dev
cd site/dist && perl -e 'alarm shift; exec @ARGV' 1800 python3 -m http.server 8800 --bind 127.0.0.1
```

Open `http://127.0.0.1:8800/`. A release build, without `--dev`, refuses uncommitted changes under `site/`.

### The activity map

`python3 site/build.py --dev --map` adds the front-page activity map. Without `--map`, the build leaves out `src/map/` and every `<!-- MAP:BEGIN -->` block in `index.html`, and keeps the `<!-- NOMAP -->` blocks; with it, the other way round. `site.json` records which (`"map"`). Markers are whole lines.

The map shows synthetic demonstration data, labelled as such, and makes no request outside the page's own files. It draws the public nodes that have a location as turquoise dots. When one is heard, it draws a violet pulse, and a thin line to each radio that heard it, for at most 15 seconds. A line is keyed by its short-lived reference, so a repeat refreshes it rather than drawing a second one. A repeated or already expired event is never drawn, and every pulse and line is cleared when the feed is not live. Reduced motion gets still highlights and lines.

The data comes through `map/feeds.js`. `fixtureFeed` is the synthetic feed every build uses. `liveFeed` reads the public feed on the same origin (`<base>nodes` and the `<base>events` stream). It refetches the catalogue at least every 15 minutes, treats 50 seconds without a heartbeat as a dead stream, and resyncs on `resync_required` or a refused stream. It removes a node at once on `node_revoked`, or when a fresh catalogue no longer lists it. Nothing selects it yet: it would take `data-feed="live"` on the map element. The feed's shape is a draft and may change. On touch screens one finger scrolls the page and two fingers zoom; the mouse wheel scrolls the page. Releases leave the map out until the public feed exists and its use on the live page is approved.

## Releasing

1. Bump `VERSION`, and merge the change.
2. On that commit of `main`, run `python3 site/build.py`. Note the tarball sha256 and the tree digest it prints.
3. Create the release `site-vX.Y.Z` from that commit, with `dist/meshcontinuum-site-X.Y.Z.tar.gz` and `dist/SHA256SUMS` attached. Put the source commit, the tarball sha256 and the tree digest in the notes.
4. Pin it. **mecon.cloud** serves the site from disk at its edge ([contract section 6.2](CONTRACT.md#62-served-from-disk-at-the-edge)), and this repository's maintainers pin it there themselves, with their restricted pin access: `pin site-vX.Y.Z <tarball sha256>`, then `status` to confirm the version and tree digest. A consumer that vendors the site in its application ([section 6.1](CONTRACT.md#61-vendored-by-the-application)) is told the version and pins it by itself.
5. Run the joint check ([section 8](CONTRACT.md#8-before-a-live-front-page-is-replaced)) against the live page: assets, sign-in, links, the application's own routes, phone, iPad and desktop. The page's `generator` meta names the live version.
6. If anything fails, roll back by pinning the previous version, which is still on disk.

A published release is never edited or replaced. A fix is a new version.

## What belongs here

Only public-safe presentation: copy, styles, icons and screenshots. Never sign-in or session code, Reader or Backend source, configuration, credentials, or any instance's names and addresses. Copy follows the [maintainer brief](../docs/PRODUCT_MESSAGING.md), and says nothing about availability beyond the one notice that links to [availability](../docs/CAPABILITIES.md).

## Provenance

The map outline in `src/map/basemap.json` is derived from [Natural Earth](https://www.naturalearthdata.com/) 1:10m countries (public domain), release v5.1.2, by `tools/make_basemap.sh`. `src/map/vendor/leaflet/` is [Leaflet](https://leafletjs.com/) 1.9.4 from npm, checked against the registry's sha512 integrity; its BSD-2-Clause licence is alongside it. The map fixtures are synthetic: no name, key or position belongs to a real radio.


The page, its styles and its diagram were taken from the hosted service's front page, written by the same author. The icons, the header mark and the social preview are copies of the files in [`brand/`](../brand), described in the [brand guide](../docs/BRAND.md). That page's sign-in panel and its script stayed with the service. The screenshots were captured on 9 October 2026 in the real application, on a build whose Reader shows v0.193.0, with synthetic demo data. They are the same files as in `docs/images/`. Licensed with this repository under [Apache-2.0](../LICENSE).
