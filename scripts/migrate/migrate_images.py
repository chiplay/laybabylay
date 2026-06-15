#!/usr/bin/env python3
"""Migrate Lay Baby Lay image assets off Cloudinary onto Cloudflare R2.

The frontend and WordPress theme deliver every image by *basename* (a flat
namespace inherited from Cloudinary). This tool mirrors that namespace into an
R2 bucket so the new Cloudflare Images delivery (images.laybabylay.com) keeps
working with the exact same keys.

Pipeline (run as separate, resumable steps):

    manifest   List every original (image + video) via the Cloudinary Admin
               API and write manifest.jsonl. This is the authoritative catalog
               of what must migrate.
    download   Download each original to ./export/<public_id>.<format>.
    upload     Upload ./export/* to R2 via the S3-compatible API (needs boto3).
    verify     Cross-check a newline-delimited list of referenced basenames
               against the manifest, reporting any that are missing.

Credentials are read from the environment only (never written to disk):

    CLOUDINARY_URL = cloudinary://<key>:<secret>@<cloud_name>
        (or CLD_KEY / CLD_SECRET / CLD_CLOUD)

    For `upload`:
    R2_ENDPOINT     = https://<account_id>.r2.cloudflarestorage.com
    R2_BUCKET       = lbl-images
    R2_ACCESS_KEY   = <r2 access key id>
    R2_SECRET_KEY   = <r2 secret access key>
"""
import argparse
import base64
import json
import os
import sys
import time
import urllib.error
import urllib.request

API_BASE = "https://api.cloudinary.com/v1_1"
EXPORT_DIR = os.environ.get("EXPORT_DIR", "export")
MANIFEST = os.environ.get("MANIFEST", "manifest.jsonl")


def creds():
    url = os.environ.get("CLOUDINARY_URL")
    if url:
        # cloudinary://key:secret@cloud
        rest = url.split("://", 1)[1]
        auth, cloud = rest.split("@", 1)
        key, secret = auth.split(":", 1)
        return key, secret, cloud
    key = os.environ.get("CLD_KEY")
    secret = os.environ.get("CLD_SECRET")
    cloud = os.environ.get("CLD_CLOUD")
    if not (key and secret and cloud):
        sys.exit("Missing Cloudinary credentials (set CLOUDINARY_URL).")
    return key, secret, cloud


def api_get(path, params=None):
    key, secret, cloud = creds()
    url = f"{API_BASE}/{cloud}/{path}"
    if params:
        from urllib.parse import urlencode
        url += "?" + urlencode(params)
    token = base64.b64encode(f"{key}:{secret}".encode()).decode()
    req = urllib.request.Request(url, headers={"Authorization": f"Basic {token}"})
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.loads(r.read())
        except urllib.error.HTTPError as e:
            if e.code in (420, 429, 500, 502, 503) and attempt < 4:
                time.sleep(2 ** attempt)
                continue
            raise
    raise RuntimeError("unreachable")


def cmd_manifest(args):
    total = 0
    with open(MANIFEST, "w") as out:
        for rtype in ("image", "video"):
            cursor = None
            while True:
                params = {"max_results": 500}
                if cursor:
                    params["next_cursor"] = cursor
                data = api_get(f"resources/{rtype}", params)
                for r in data.get("resources", []):
                    rec = {
                        "public_id": r["public_id"],
                        "format": r.get("format", ""),
                        "resource_type": r["resource_type"],
                        "bytes": r.get("bytes", 0),
                        "version": r.get("version"),
                        "secure_url": r["secure_url"],
                    }
                    out.write(json.dumps(rec) + "\n")
                    total += 1
                cursor = data.get("next_cursor")
                if not cursor:
                    break
    print(f"Wrote {total} records to {MANIFEST}")


def key_for(rec):
    fmt = rec.get("format")
    return f"{rec['public_id']}.{fmt}" if fmt else rec["public_id"]


def read_manifest():
    with open(MANIFEST) as f:
        for line in f:
            line = line.strip()
            if line:
                yield json.loads(line)


def cmd_download(args):
    import concurrent.futures
    import threading

    os.makedirs(EXPORT_DIR, exist_ok=True)
    workers = int(os.environ.get("WORKERS", "16"))
    counts = {"done": 0, "skipped": 0, "failed": 0}
    lock = threading.Lock()

    def fetch(rec):
        dest = os.path.join(EXPORT_DIR, key_for(rec))
        if os.path.exists(dest) and os.path.getsize(dest) == rec["bytes"]:
            with lock:
                counts["skipped"] += 1
            return
        try:
            tmp = dest + ".part"
            urllib.request.urlretrieve(rec["secure_url"], tmp)
            os.replace(tmp, dest)
            with lock:
                counts["done"] += 1
                if counts["done"] % 200 == 0:
                    print(f"  downloaded {counts['done']} "
                          f"(skipped {counts['skipped']})...", flush=True)
        except Exception as e:  # noqa: BLE001
            with lock:
                counts["failed"] += 1
            print(f"  FAIL {key_for(rec)}: {e}", file=sys.stderr)

    recs = list(read_manifest())
    with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as ex:
        list(ex.map(fetch, recs))
    print(f"Downloaded {counts['done']}, skipped {counts['skipped']}, "
          f"failed {counts['failed']} -> {EXPORT_DIR}/")


CTYPES = {"jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png",
          "gif": "image/gif", "webp": "image/webp", "svg": "image/svg+xml",
          "heic": "image/heic", "mp4": "video/mp4", "pdf": "application/pdf"}


def ctype_for(key):
    ext = key.rsplit(".", 1)[-1].lower() if "." in key else ""
    return CTYPES.get(ext, "application/octet-stream")


def cmd_upload(args):
    import boto3  # type: ignore
    from botocore.config import Config  # type: ignore
    import concurrent.futures
    import threading

    workers = int(os.environ.get("WORKERS", "16"))
    s3 = boto3.client(
        "s3",
        endpoint_url=os.environ["R2_ENDPOINT"],
        aws_access_key_id=os.environ["R2_ACCESS_KEY"],
        aws_secret_access_key=os.environ["R2_SECRET_KEY"],
        config=Config(signature_version="s3v4", max_pool_connections=workers + 8),
    )
    bucket = os.environ["R2_BUCKET"]
    counts = {"up": 0, "skipped": 0, "failed": 0}
    lock = threading.Lock()

    def put(key, src):
        if not os.path.exists(src):
            with lock:
                counts["skipped"] += 1
            print(f"  MISSING local file, skip: {key}", file=sys.stderr)
            return
        try:
            s3.upload_file(src, bucket, key,
                           ExtraArgs={"ContentType": ctype_for(key)})
            with lock:
                counts["up"] += 1
                if counts["up"] % 200 == 0:
                    print(f"  uploaded {counts['up']}...", flush=True)
        except Exception as e:  # noqa: BLE001
            with lock:
                counts["failed"] += 1
            print(f"  FAIL {key}: {e}", file=sys.stderr)

    originals = [(key_for(r), os.path.join(EXPORT_DIR, key_for(r)))
                 for r in read_manifest()]

    # Extension aliases: Cloudinary treated the URL extension as an output
    # format (so foo.jpeg served foo.jpg); R2 needs exact keys. aliasmap.json
    # maps a referenced basename -> the real manifest key to copy it from.
    amap = os.environ.get("ALIASMAP", "aliasmap.json")
    aliases = []
    if os.path.exists(amap):
        aliases = [(ak, os.path.join(EXPORT_DIR, sk))
                   for ak, sk in json.load(open(amap)).items()]

    with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as ex:
        list(ex.map(lambda a: put(*a), originals + aliases))

    print(f"Uploaded {counts['up']}, skipped {counts['skipped']}, "
          f"failed {counts['failed']} (incl. {len(aliases)} aliases) "
          f"to r2://{bucket}/")


def basename(ref):
    # Match urijs .filename(): last path segment, query string stripped.
    return ref.rsplit("/", 1)[-1].split("?", 1)[0]


def cmd_verify(args):
    """Categorize referenced basenames against the manifest.

    direct  - exact key match (will work on R2 as-is)
    alias   - stem matches a real public_id but extension differs (Cloudinary
              normalized it; we must copy an alias key on R2). Written to
              aliasmap.json for the upload step.
    missing - not resolvable at all (typically already 404 on Cloudinary, e.g.
              WordPress -WxH thumbnail names that were never uploaded).
    """
    recs = list(read_manifest())
    have = {key_for(r) for r in recs}
    by_stem = {r["public_id"]: key_for(r) for r in recs}

    with open(args.refs) as f:
        refs = {basename(line.strip()) for line in f if line.strip()}

    direct, alias, missing = [], {}, []
    for ref in sorted(refs):
        if ref in have:
            direct.append(ref)
        elif ref.rsplit(".", 1)[0] in by_stem:
            alias[ref] = by_stem[ref.rsplit(".", 1)[0]]
        else:
            missing.append(ref)

    with open("aliasmap.json", "w") as f:
        json.dump(alias, f, indent=2)

    print(f"Referenced basenames: {len(refs)}")
    print(f"  direct : {len(direct)}")
    print(f"  alias  : {len(alias)}  (written to aliasmap.json)")
    print(f"  missing: {len(missing)}")
    for k, v in alias.items():
        print(f"    alias  {k}  <-  {v}")
    for m in missing[:100]:
        print(f"    missing {m}")


def main():
    p = argparse.ArgumentParser(description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)
    sub.add_parser("manifest").set_defaults(func=cmd_manifest)
    sub.add_parser("download").set_defaults(func=cmd_download)
    sub.add_parser("upload").set_defaults(func=cmd_upload)
    v = sub.add_parser("verify")
    v.add_argument("refs", help="file with one referenced basename/URL per line")
    v.set_defaults(func=cmd_verify)
    args = p.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
