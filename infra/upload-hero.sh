#!/usr/bin/env bash
# Upload / re-upload hero and product images to the citigrove-images GCS bucket.
# Run from repo root:  bash infra/upload-hero.sh
set -euo pipefail

export PATH="/opt/homebrew/share/google-cloud-sdk/bin:$PATH"

BUCKET="gs://citigrove-images"
PROJECT="organic-spirit-488116-e2"

echo "▸ Uploading hero image..."
gcloud storage cp public/hero-bg.jpg "${BUCKET}/hero/hero-bg.jpg" \
  --project="$PROJECT"

echo ""
echo "✓ Hero image uploaded → ${BUCKET}/hero/hero-bg.jpg"
echo "  Public URL: https://storage.googleapis.com/citigrove-images/hero/hero-bg.jpg"
