# Cloudinary → Cloudflare R2 image migration

Lay Baby Lay delivers every image off Cloudinary (Plus plan, ~$100/mo). This
moves the originals to a **Cloudflare R2** bucket and serves them through
**Cloudflare Image Transformations** at `https://images.laybabylay.com`.

The frontend and WordPress theme reference every image by **basename** (a flat
namespace inherited from Cloudinary), so the R2 bucket mirrors that namespace:
object key = `<public_id>.<format>` (e.g. `IMG_5211.jpg`).

## What's in the account (audited 2026-06-15)

- **5,714 originals, 8.84 GB** (5,713 images + 1 legacy 2016 `.mp4`).
- Formats: jpg 4910, png 762, plus source files (13 pdf, 12 ai, 9 psd, 4 heic,
  2 svg, 1 gif). Source files are copied for safekeeping but are not served
  through image transforms.
- Flat namespace, no folders. ~19.2 GB/mo bandwidth.
- **The originals exist only on Cloudinary** — the WordPress media library
  (5,311 items) already points every `source_url` at `res.cloudinary.com`, and
  the old Flywheel `wp-content/uploads` paths 404. So this export is mandatory;
  re-pointing at Flywheel is not possible.

## Coverage (verified against the live Algolia indexes)

1463 unique referenced basenames: **1455 direct**, **1 extension alias**
(`preview_146273ff6b.jpeg` → `.jpg`, handled by `aliasmap.json`), **7 already
404 on Cloudinary today** (WordPress `-WxH` thumbnail names that were never
uploaded — pre-existing broken images, not regressions).

`manifest.jsonl` is the authoritative catalog. `aliasmap.json` lists keys that
must be duplicated on R2 because Cloudinary treated the URL extension as a
desired output format.

## One-time Cloudflare setup (console or API)

1. Create an R2 bucket, e.g. `lbl-images`.
2. Add a **custom domain** `images.laybabylay.com` to the bucket (this creates
   the proxied DNS record on the `laybabylay.com` zone automatically).
3. Enable **Image Transformations** for the `laybabylay.com` zone
   (Speed → Optimization → Image Transformations; "Resize from this zone").
4. Create an **R2 API token** (S3 credentials: access key id + secret) for the
   upload step.

## Run the migration

```bash
pip install boto3                       # for the upload step only
cd scripts/migrate
export CLOUDINARY_URL="cloudinary://<key>:<secret>@laybabylay"

# 1. (Re)build the catalog — already committed, refresh if assets changed.
python3 migrate_images.py manifest

# 2. Confirm coverage and (re)generate aliasmap.json from live references.
#    Build refs first (Algolia first_image/featured_image/product_image):
#    see "Regenerate references" below; /tmp/algolia_refs.txt is the input.
python3 migrate_images.py verify /tmp/algolia_refs.txt

# 3. Download all originals to ./export (resumable; skips complete files).
python3 migrate_images.py download

# 4. Upload to R2 (also creates the extension aliases from aliasmap.json).
export R2_ENDPOINT="https://<account_id>.r2.cloudflarestorage.com"
export R2_BUCKET="lbl-images"
export R2_ACCESS_KEY="..." R2_SECRET_KEY="..."
python3 migrate_images.py upload
```

Sanity check a delivery URL after upload:

```bash
curl -I "https://images.laybabylay.com/cdn-cgi/image/width=500,quality=36,format=auto/IMG_5211.jpg"
curl -I "https://images.laybabylay.com/sprites_lblvio.png"   # raw static asset
```

## Cutover order (important)

R2 must be populated **before** deploying the frontend, because the app switches
to `images.laybabylay.com` immediately on deploy.

1. Export + upload to R2 (steps above); verify delivery URLs.
2. Deploy the frontend (`npm run build` on Heroku) — cards/hero/OG/etc. now hit R2.
3. Deploy the WordPress theme (`functions.php`) so post-body `<img>` tags hit R2.
   Inline images keep working on old Cloudinary URLs until this deploy, so the
   two deploys don't have to be simultaneous.
4. Verify the live site (post pages, search, related, OG tags via a scraper).
5. Only then cancel/downgrade Cloudinary.

## Rollback

The frontend change is contained in `app/scripts/utils/index.js`
(`IMAGE_HOST` + helpers). Reverting the branch restores Cloudinary delivery.
Keep Cloudinary active until the live site is verified on R2.

## Regenerate references (for coverage/aliases)

`verify` takes a newline-delimited file of referenced URLs/basenames. Build it
from the live Algolia indexes (`wp_posts_post`, `wp_searchable_posts`) by
collecting `first_image`, `featured_image`, and `product_image`. For complete
coverage including post-body images, also extract `<img src>` basenames from
post content. See the session notes / commit history for the snippet used.
