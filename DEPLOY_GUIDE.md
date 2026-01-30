# Deployment & Verification Guide

Follow these steps to deploy and verify your AI Resume ATS SaaS.

## 1. Local Setup & Verification

Since `npm` was not detected in the environment during building, ensure **Node.js (v18+)** is installed on your system.

### Install Dependencies
```bash
# In backend folder
cd backend
npm install

# In frontend folder
cd ../frontend
npm install
```

### Configure Environment
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=anything_random_and_secure
OPENROUTER_API_KEY=your_key_from_openrouter.ai
RAZORPAY_KEY_ID=xxx
RAZORPAY_KEY_SECRET=yyy
RAZORPAY_WEBHOOK_SECRET=zzz
```

### Run Locally
```bash
# Terminal 1 (Backend)
cd backend
npm run dev

# Terminal 2 (Frontend)
cd frontend
npm run dev
```

---

## 2. Deployment (Google Cloud Run)

The repository is configured with a multi-stage `Dockerfile`.

### Automated Build & Deploy
1. **Build Container**:
   `gcloud builds submit --tag gcr.io/[PROJECT_ID]/ai-resume-ats`
2. **Deploy to Cloud Run**:
   `gcloud run deploy ai-resume-ats --image gcr.io/[PROJECT_ID]/ai-resume-ats --platform managed`
3. **Set Env Vars** in Cloud Run Console for all keys in `.env`.

---

## 3. How to Check (Smoke Test)

After starting the app, perform these 5 checks to verify everything is working:

### ✅ Check 1: Health & Auth
- Open `http://localhost:5000/health` or `[YOUR_URL]/health`.
- **Success Criteria**: Returns `{"status": "ok"}`. This verifies the server is up and the non-root user has correct permissions.
- Open the landing page and verify the "Digitally." logo and assets load.

### ✅ Check 2: Resume Upload
- Go to the Dashboard.
- Drag and drop a **PDF resume**.
- **Success Criteria**: The UI shows "Uploading..." and then transitions to the Analysis page.

### ✅ Check 3: AI Analysis (The Engine)
- On the Analysis page, verify that the **ATS Score** circle animates.
- Check if "Summary" and "Critical Issues" are populated with meaningful text (not empty or error messages).
- **Pro Tip**: In the backend logs, you should see `AI Call Successful`.

### ✅ Check 4: AI Chat (Consultant)
- Find the "Career Consultant" or "Chat" section (if implemented in UI) or test the API:
  `POST /api/chat/consultant` with `{"message": "How do I ask for a 20% raise?"}`.
- Verify the response is "Ruthless" and tactical.

### ✅ Check 5: Payment Flow (Test Mode)
- Click "Upgrade" or "Rewrite with AI".
- Verify the Razorpay popup appears.
- **Verification**: If using Razorpay Test Mode, use a test card. Verify that upon success, the `credits` in your Dashboard increase.

---

## Troubleshooting
- **CORS Error**: Ensure `Vite` proxy is correctly pointing to `localhost:5000` in `vite.config.js`.
- **Parsing Error**: If PDF text looks like "Text extraction not implemented", check if `pdf-parse` is properly installed in the backend.
- **AI Error**: Check `OPENROUTER_API_KEY` validity.
