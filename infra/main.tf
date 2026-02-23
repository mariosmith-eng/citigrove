terraform {
  required_version = ">= 1.5"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 6.0"
    }
  }
}

provider "google" {
  project               = var.project_id
  region                = var.region
  billing_project       = var.project_id
  user_project_override = true
}

provider "google-beta" {
  project               = var.project_id
  region                = var.region
  billing_project       = var.project_id
  user_project_override = true
}

# ── Shared GCP project (same org as brighthornmedia / essicommercial).
#    Firebase APIs are already enabled. We add a new Hosting site, GCS bucket,
#    media-reader SA, and deployer SA.

# ── GCS Media Bucket ──────────────────────────────────────────────────────────

resource "google_storage_bucket" "media" {
  name                        = var.bucket_name
  location                    = var.bucket_location
  storage_class               = "STANDARD"
  uniform_bucket_level_access = true
  force_destroy               = false

  versioning {
    enabled = false
  }

  cors {
    origin          = var.allowed_origins
    method          = ["GET", "HEAD", "OPTIONS"]
    response_header = ["Content-Type", "Cache-Control"]
    max_age_seconds = 3600
  }

  lifecycle_rule {
    condition {
      age = 365
    }
    action {
      type          = "SetStorageClass"
      storage_class = "NEARLINE"
    }
  }

  labels = {
    project     = "citigrove"
    environment = var.environment
    managed_by  = "terraform"
  }
}

# ── Service account for signed URL generation ─────────────────────────────────

resource "google_service_account" "media_reader" {
  account_id   = "citigrove-media-reader"
  display_name = "CitiGrove Media Reader"
  description  = "Used by the Next.js app to generate signed URLs for GCS objects"
}

resource "google_storage_bucket_iam_member" "media_reader_access" {
  bucket = google_storage_bucket.media.name
  role   = "roles/storage.objectViewer"
  member = "serviceAccount:${google_service_account.media_reader.email}"
}

# ── Deployer service account for GitHub Actions ───────────────────────────────

resource "google_service_account" "deployer" {
  account_id   = "citigrove-deployer"
  display_name = "CitiGrove Deployer"
  description  = "Used by GitHub Actions to deploy to Firebase Hosting + Functions"
}

resource "google_project_iam_member" "deployer_firebase_admin" {
  project = var.project_id
  role    = "roles/firebase.admin"
  member  = "serviceAccount:${google_service_account.deployer.email}"
}

resource "google_project_iam_member" "deployer_run_admin" {
  project = var.project_id
  role    = "roles/run.admin"
  member  = "serviceAccount:${google_service_account.deployer.email}"
}

resource "google_project_iam_member" "deployer_storage_admin" {
  project = var.project_id
  role    = "roles/storage.admin"
  member  = "serviceAccount:${google_service_account.deployer.email}"
}

resource "google_project_iam_member" "deployer_cloudfunctions_admin" {
  project = var.project_id
  role    = "roles/cloudfunctions.admin"
  member  = "serviceAccount:${google_service_account.deployer.email}"
}

resource "google_project_iam_member" "deployer_service_account_user" {
  project = var.project_id
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${google_service_account.deployer.email}"
}

# ── Bucket folders (placeholder objects for logical structure) ────────────────

resource "google_storage_bucket_object" "folder_hero" {
  name    = "hero/.keep"
  content = " "
  bucket  = google_storage_bucket.media.name
}

resource "google_storage_bucket_object" "folder_products" {
  name    = "products/.keep"
  content = " "
  bucket  = google_storage_bucket.media.name
}

resource "google_storage_bucket_object" "folder_blog" {
  name    = "blog/.keep"
  content = " "
  bucket  = google_storage_bucket.media.name
}

# ── Firebase Hosting site ─────────────────────────────────────────────────────

resource "google_firebase_hosting_site" "site" {
  provider = google-beta
  project  = var.project_id
  site_id  = var.firebase_site_id
}

resource "google_firebase_web_app" "web" {
  provider     = google-beta
  project      = var.project_id
  display_name = var.firebase_web_app_display_name
}
