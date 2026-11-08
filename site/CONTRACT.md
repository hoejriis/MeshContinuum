# Site artifact: integration contract

Contract version **1.0.0**. A deployment (the *consumer*) serves the MeshContinuum presentation site in place of its own front page. This page is everything the consumer needs. The artifact holds no authentication, Reader or Backend code, no credentials and no instance data.

## 1. Artifact

- Published as a GitHub release `site-vX.Y.Z` in `hoejriis/MeshContinuum`, with two assets: `meshcontinuum-site-X.Y.Z.tar.gz` and `SHA256SUMS`. A published release is never edited or deleted. Site versions are independent of Backend and firmware versions.
- The tarball contains these, and nothing else:
  - `index.html`, the entry page;
  - `site/X.Y.Z/…`, every asset (CSS, JS, icons, preview images);
  - `site/X.Y.Z/site.json`: `artifact_version`, `contract_version`, `source_commit`, `built_at`, and `files`, a map from each other file's path to its sha256.
- The build is deterministic: the same commit gives the same tarball bytes.
- **Tree digest.** sha256 over one line per file in the artifact, `site.json` and `index.html` included. Each line is `"<sha256>  <path>\n"`, with two spaces. Paths are relative, use `/`, and have no leading `./`. Lines are sorted by path in byte order (`LC_ALL=C`). The build prints it, and the release notes carry it. The shell equivalent, run in the extracted tree:

  ```sh
  find . -type f | sed 's|^\./||' | LC_ALL=C sort | while read p; do shasum -a 256 "$p"; done | shasum -a 256
  ```

## 2. Routes: what the artifact claims

- `GET /` and `HEAD /` serve `index.html`.
- `GET /site/**` serves files from the artifact's `site/` directory.
- Nothing else. Every other path belongs to the consumer. The artifact never ships a file outside `index.html` and `site/`, so it cannot shadow the consumer's application, sign-in, health, firmware or documentation routes.
- `index.html` references its assets only by absolute paths under `/site/X.Y.Z/`. A cached page never mixes assets from two versions.
- Caching: `/site/X.Y.Z/**` may be served as immutable. `/` should be `no-cache`.

## 3. Sign in

- The artifact has no sign-in form and no session logic. It shows **Sign in** as a plain link to the consumer's sign-in route, by default `/sign-in`.
- The page makes no authenticated request, and does not probe whether the visitor is signed in.

## 4. Instance configuration

The artifact is instance-neutral. The consumer may serve `GET /site-instance.json`, its own route and not part of the artifact:

```json
{"name": "<public name>", "origin": "https://<host>", "sign_in": "/sign-in", "contract": 1}
```

- The page reads it once, same-origin and without credentials. It shows `name` beside the wordmark and points Sign in at `sign_in`.
- `sign_in` must be a same-origin path, starting with `/` but not `//`. Anything else is ignored.
- `contract` is the contract major the consumer serves. If it is present and differs from the artifact's major, the page ignores the file.
- If the file is missing or invalid, or JavaScript is off, the page shows the generic product name and links Sign in to `/sign-in`.
- Nothing else is read. No credentials, addresses, topology or user data go in it.

## 5. Headers the page works under

`default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'`. The page has no inline script or style and no third-party origin. External links (GitHub, MeshCore) are ordinary navigations.

## 6. Version pin and rollback

- The consumer vendors each pinned release. It fetches the tarball once, at pin time, and checks it against `SHA256SUMS`. It extracts it into its own tree, and pins the version, the release URL, the tarball sha256 and the tree digest.
- At each start, the consumer re-checks the tree digest, and serves its own built-in page on a mismatch.
- Nothing is fetched from GitHub at build or request time, and nothing is taken from `main`. An offline copy builds too.
- Rollback: pin an earlier version and redeploy. Earlier releases stay available.
- `contract_version` is semver. A major bump means the consumer must change something: routes, the config shape or headers.

## 7. Local preview

`python3 site/build.py --dev` builds into `site/dist/`. Serve that folder with any static server on localhost, for example with a lifetime:

```sh
cd site/dist && perl -e 'alarm shift; exec @ARGV' 1800 python3 -m http.server 8800 --bind 127.0.0.1
```

No production credentials are involved. With no `/site-instance.json`, the defaults from section 4 apply.

## 8. Before a live front page is replaced

A joint journey check by consumer and site:

- the front page loads with all assets;
- Sign in reaches the consumer's sign-in and a real sign-in completes;
- the docs and firmware links resolve;
- the consumer's own routes are unaffected;
- the page reads well on desktop, phone and iPad;
- a rollback to the previous page works.
