#!/usr/bin/env bash
# One-time bootstrap: provisions Firebase Hosting site + GCS bucket + service accounts
# via Terraform, then downloads a deployer key for GitHub Actions and a media-reader
# key for the Next.js signed-URL function.
#
# Prerequisites:
#   - gcloud CLI authenticated as your admin account
#   - terraform installed:       brew install terraform
#   - firebase-tools installed:  npm install -g firebase-tools && firebase login
#
# Run once from repo root:  bash infra/setup.sh
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
DEPLOYER_KEY_OUT="$ROOT_DIR/firebase-service-account.json"
MEDIA_KEY_OUT="$ROOT_DIR/gcs-service-account.json"

PROJECT_ID="organic-spirit-488116-e2"
DEPLOYER_SA="citigrove-deployer"
MEDIA_SA="citigrove-media-reader"
DEPLOYER_EMAIL="${DEPLOYER_SA}@${PROJECT_ID}.iam.gserviceaccount.com"
MEDIA_EMAIL="${MEDIA_SA}@${PROJECT_ID}.iam.gserviceaccount.com"

export PATH="/opt/homebrew/share/google-cloud-sdk/bin:$PATH"

echo "▸ Setting active GCP project: $PROJECT_ID"
gcloud config set project "$PROJECT_ID" --quiet

echo "▸ Running terraform init..."
cd "$SCRIPT_DIR"
terraform init

echo "▸ Running terraform apply..."
terraform apply -auto-approve

echo "▸ Applying Firebase Hosting target..."
cd "$ROOT_DIR"
firebase target:apply hosting site citigrove --project "$PROJECT_ID"

echo "▸ Downloading deployer service account key for GitHub Actions..."
gcloud iam service-accounts keys create "$DEPLOYER_KEY_OUT" \
  --iam-account="$DEPLOYER_EMAIL" \
  --project="$PROJECT_ID"

echo "▸ Downloading media-reader service account key..."
gcloud iam service-accounts keys create "$MEDIA_KEY_OUT" \
  --iam-account="$MEDIA_EMAIL" \
  --project="$PROJECT_ID"

echo ""
echo "✓ Done!"
echo ""
echo "Next steps:"
echo "  1. Copy the CONTENTS of firebase-service-account.json as a GitHub secret:"
echo "       Repo → Settings → Secrets → Actions → New secret"
echo "       Name: FIREBASE_SERVICE_ACCOUNT"
echo "  2. Delete both .json key files after uploading (they are gitignored)"
echo "  3. cp .env.local.example .env.local"
echo "  4. Fill in NEXT_PUBLIC_GCS_BUCKET_URL in .env.local"
echo "  5. Upload hero image:  bash infra/upload-hero.sh"
echo ""
cd "$SCRIPT_DIR"
terraform output
