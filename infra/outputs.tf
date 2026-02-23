output "bucket_name" {
  description = "Name of the GCS media bucket"
  value       = google_storage_bucket.media.name
}

output "bucket_url" {
  description = "Base URL to access objects in the bucket"
  value       = "https://storage.googleapis.com/${google_storage_bucket.media.name}"
}

output "bucket_console_url" {
  description = "Google Cloud Console URL for the bucket"
  value       = "https://console.cloud.google.com/storage/browser/${google_storage_bucket.media.name}"
}

output "media_reader_service_account_email" {
  description = "Service account email used for signed URL generation"
  value       = google_service_account.media_reader.email
}

output "deployer_service_account_email" {
  description = "Service account email used by GitHub Actions for deployment"
  value       = google_service_account.deployer.email
}

output "firebase_site_id" {
  description = "Firebase Hosting site ID"
  value       = google_firebase_hosting_site.site.site_id
}

output "firebase_web_app_id" {
  description = "Firebase Web App ID"
  value       = google_firebase_web_app.web.app_id
}

output "firebase_hosting_default_url" {
  description = "Default Firebase Hosting URL"
  value       = "https://${google_firebase_hosting_site.site.site_id}.web.app"
}
