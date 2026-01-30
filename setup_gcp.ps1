# AI Resume SaaS - GCP Infrastructure Setup
# Run this in your local PowerShell after running 'gcloud auth login'

$PROJECT_ID = "YOUR_PROJECT_ID"
$SERVICE_ACCOUNT_NAME = "resume-ai-deployer"

Write-Host "Setting Project..." -ForegroundColor Cyan
gcloud config set project $PROJECT_ID

Write-Host "Enabling APIs..." -ForegroundColor Cyan
gcloud services enable run.googleapis.com containerregistry.googleapis.com cloudbuild.googleapis.com

Write-Host "Creating Service Account..." -ForegroundColor Cyan
gcloud iam service-accounts create $SERVICE_ACCOUNT_NAME `
    --display-name="Resume AI GitHub Deployer"

Write-Host "Assigning Roles..." -ForegroundColor Cyan
# Cloud Run Admin
gcloud projects add-iam-policy-binding $PROJECT_ID `
    --member="serviceAccount:$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" `
    --role="roles/run.admin"

# Storage Admin (for Container Registry)
gcloud projects add-iam-policy-binding $PROJECT_ID `
    --member="serviceAccount:$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" `
    --role="roles/storage.admin"

# Service Account User
gcloud projects add-iam-policy-binding $PROJECT_ID `
    --member="serviceAccount:$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" `
    --role="roles/iam.serviceAccountUser"

Write-Host "Generating JSON Key..." -ForegroundColor Cyan
gcloud iam service-accounts keys create gcp-key.json `
    --iam-account="$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com"

Write-Host "DONE! Your key is saved as 'gcp-key.json'. Copy its content to GitHub Secrets as 'GCP_SA_KEY'." -ForegroundColor Green
