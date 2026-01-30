# Zero-Cost Local Setup Guide

You can run this entire SaaS locally for FREE using just your OpenRouter Key.

## Prerequisites
1. **Node.js**: [Download Here](https://nodejs.org/)
2. **MongoDB Community**: [Download Here](https://www.mongodb.com/try/download/community) (Run this locally to avoid Cloud Atlas costs)

## Step 1: Backend Setup
1. Open `e:\Digitally\backend` in terminal.
2. Create a `.env` file:
   ```env
   PORT=5000
   JWT_SECRET=local_dev_secret
   OPENROUTER_API_KEY=sk-or-.... (YOUR KEY HERE)
   # Razorpay & Mongo will auto-fallback to Mock/Local modes
   ```
3. Install & Run:
   ```bash
   npm install
   npm run dev
   ```

## Step 2: Frontend Setup
1. Open `e:\Digitally\frontend` in a **new** terminal.
2. Install & Run:
   ```bash
   npm install
   npm run dev
   ```

## Step 3: Use the App
Open `http://localhost:5173`.
- **Upload**: Works locally.
- **AI**: Uses your OpenRouter key.
- **Payments**: Will be "Mocked" (simulated success) so you can test Premium features without a gateway.

## Deployment Options (Free)
If you want to share it, try **Render.com** (offers Free Node.js hosting) or **Vercel** (Free Frontend). Google Cloud Run requires a credit card even for the free tier.
