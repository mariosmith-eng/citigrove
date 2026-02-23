variable "project_id" {
  description = "Google Cloud project ID (shared org project)"
  type        = string
  default     = "organic-spirit-488116-e2"
}

variable "region" {
  description = "Default Google Cloud region"
  type        = string
  default     = "us-east1"
}

variable "environment" {
  description = "Deployment environment label"
  type        = string
  default     = "production"
}

variable "bucket_name" {
  description = "Globally unique name for the GCS media bucket"
  type        = string
  default     = "citigrove-images"
}

variable "bucket_location" {
  description = "GCS bucket location (multi-region or region)"
  type        = string
  default     = "US"
}

variable "allowed_origins" {
  description = "CORS allowed origins for the media bucket"
  type        = list(string)
  default = [
    "https://citigrove.web.app",
    "https://citigrove.com",
    "https://www.citigrove.com",
    "http://localhost:3000",
    "http://localhost:3001",
  ]
}

variable "firebase_site_id" {
  description = "Firebase Hosting site ID — must be globally unique and lowercase"
  type        = string
  default     = "citigrove"
}

variable "firebase_web_app_display_name" {
  description = "Display name for the Firebase Web App"
  type        = string
  default     = "CitiGrove Web"
}
