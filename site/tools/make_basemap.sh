#!/bin/sh
# Rebuilds site/src/map/basemap.json: Natural Earth 1:10m country shapes
# (public domain), clipped to the Nordic frame the map opens on and
# simplified. Runs in a throwaway container; the output is committed, so
# the site build never fetches anything.
#   sh site/tools/make_basemap.sh
set -eu
here=$(cd "$(dirname "$0")/.." && pwd)
NE_REV=v5.1.2
docker run --rm -v "$here/src/map:/out" node:22-bookworm-slim sh -c "
  set -eu
  cd /tmp
  apt-get -qq update >/dev/null && apt-get -qq install -y curl >/dev/null
  curl -fsSL -o c.json https://raw.githubusercontent.com/nvkelso/natural-earth-vector/$NE_REV/geojson/ne_10m_admin_0_countries.geojson
  npx -y mapshaper@0.6.102 c.json \
    -clip bbox=-2,51,26,64 \
    -filter-fields NAME \
    -simplify 12% keep-shapes \
    -o precision=0.001 format=geojson /out/basemap.json
"
ls -l "$here/src/map/basemap.json"
