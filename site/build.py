#!/usr/bin/env python3
"""Builds the MeshContinuum presentation site into one versioned artifact.

    python3 site/build.py            # release build: needs a clean, committed tree
    python3 site/build.py --dev      # local preview build from the working tree

Output, in site/dist/:
    index.html                     the entry page, assets referenced under /site/<version>/
    site/<version>/...             every asset, and site.json
    meshcontinuum-site-<version>.tar.gz
    SHA256SUMS

The build is deterministic: the same commit gives the same tarball bytes.
It prints the tree digest defined in CONTRACT.md, section 1.
"""

import gzip
import hashlib
import io
import json
import shutil
import subprocess
import sys
import tarfile
from pathlib import Path

CONTRACT_VERSION = "1.0.0"
HERE = Path(__file__).resolve().parent
SRC = HERE / "src"
DIST = HERE / "dist"


def git(*args: str) -> str:
    return subprocess.run(["git", "-C", str(HERE), *args], check=True, capture_output=True, text=True).stdout.strip()


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def main() -> int:
    dev = "--dev" in sys.argv[1:]
    version = (HERE / "VERSION").read_text().strip()
    commit = git("rev-parse", "HEAD")
    commit_time = int(git("log", "-1", "--format=%ct"))
    commit_iso = git("log", "-1", "--format=%cI")
    if git("status", "--porcelain", "--", str(HERE)):
        if not dev:
            print("site/ has uncommitted changes: commit them, or build with --dev for a preview", file=sys.stderr)
            return 1
        commit += "+dirty"

    asset_root = f"/site/{version}"
    files: dict[str, bytes] = {}
    for path in sorted(SRC.rglob("*")):
        if not path.is_file():
            continue
        rel = path.relative_to(SRC).as_posix()
        data = path.read_bytes()
        if rel == "index.html":
            text = data.decode("utf-8").replace("{{ASSET}}", asset_root).replace("{{VERSION}}", version)
            if "{{" in text:
                print("index.html has an unfilled placeholder", file=sys.stderr)
                return 1
            files["index.html"] = text.encode("utf-8")
        else:
            files[f"site/{version}/{rel}"] = data

    meta = {
        "artifact_version": version,
        "contract_version": CONTRACT_VERSION,
        "source_commit": commit,
        "built_at": commit_iso,
        "files": {p: sha256(d) for p, d in sorted(files.items())},
    }
    files[f"site/{version}/site.json"] = (json.dumps(meta, indent=2, sort_keys=True) + "\n").encode("utf-8")

    # Tree digest (CONTRACT.md section 1): sha256 over "<sha256>  <path>\n"
    # lines, one per file, sorted by path in byte order.
    lines = "".join(f"{sha256(files[p])}  {p}\n" for p in sorted(files, key=lambda p: p.encode("utf-8")))
    tree_digest = sha256(lines.encode("utf-8"))

    if DIST.exists():
        shutil.rmtree(DIST)
    for rel, data in files.items():
        out = DIST / rel
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_bytes(data)

    tar_name = f"meshcontinuum-site-{version}.tar.gz"
    raw = io.BytesIO()
    with tarfile.open(fileobj=raw, mode="w", format=tarfile.PAX_FORMAT) as tar:
        for rel in sorted(files, key=lambda p: p.encode("utf-8")):
            info = tarfile.TarInfo(rel)
            info.size = len(files[rel])
            info.mtime = commit_time
            info.mode = 0o644
            info.uid = info.gid = 0
            info.uname = info.gname = ""
            tar.addfile(info, io.BytesIO(files[rel]))
    packed = io.BytesIO()
    with gzip.GzipFile(filename="", mode="wb", fileobj=packed, mtime=0) as gz:
        gz.write(raw.getvalue())
    tarball = packed.getvalue()
    (DIST / tar_name).write_bytes(tarball)
    (DIST / "SHA256SUMS").write_text(f"{sha256(tarball)}  {tar_name}\n")

    print(f"site {version}, contract {CONTRACT_VERSION}, commit {commit}")
    print(f"{len(files)} files")
    print(f"tarball  {sha256(tarball)}  {tar_name}")
    print(f"tree     {tree_digest}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
