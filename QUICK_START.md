# Digitally Project - Quick Start Guide

## Prerequisites
- The project includes a local Node.js installation in `node_bin/node-v20.11.0-win-x64`
- MongoDB connection (optional - app works without it with limited features)

## Quick Start

### Option 1: Using the Fixed Launcher (Recommended)
```bash
run_app_fixed.bat
```

This will:
1. Use the local Node.js installation
2. Install all dependencies
3. Start both backend and frontend servers

### Option 2: Manual Start

#### Backend
```bash
cd backend
..\node_bin\node-v20.11.0-win-x64\npm.cmd install
..\node_bin\node-v20.11.0-win-x64\npm.cmd run dev
```

#### Frontend (in a new terminal)
```bash
cd frontend
..\node_bin\node-v20.11.0-win-x64\npm.cmd install
..\node_bin\node-v20.11.0-win-x64\npm.cmd run dev
```

## Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:5173/admin

## Environment Variables

The backend uses `.env` file with the following variables:
- `PORT=5000` - Backend server port
- `MONGO_URI` - MongoDB connection string (optional)
- `JWT_SECRET` - Secret for JWT tokens
- `OPENROUTER_API_KEY` - API key for AI features
- `ADMIN_USERNAME` - Admin panel username
- `ADMIN_PASSWORD` - Admin panel password

## Features

### Agency Mode
- Digital Marketing Services
- Web Development Showcase
- SEO Services
- Portfolio Display
- Contact Form

### AI Lab Mode
- Website Roaster Tool
- Resume ATS Analyzer
- Lead Qualification Tool
- AI Chat Assistant

## Troubleshooting

### Node.js not found
- Ensure `node_bin/node-v20.11.0-win-x64` folder exists
- Use `run_app_fixed.bat` which sets the correct PATH

### Backend won't start
- Check if port 5000 is available
- Verify `.env` file exists in backend folder
- MongoDB connection is optional - app will work without it

### Frontend won't start
- Check if port 5173 is available
- Ensure backend is running first
- Clear browser cache if needed

### API calls failing
- Verify backend is running on port 5000
- Check browser console for CORS errors
- Ensure Vite proxy is configured correctly

## Recent Fixes Applied

1. ✅ **Upload Middleware** - Enhanced MIME type validation for PDF/DOC files
2. ✅ **CORS Configuration** - Improved to handle development and production
3. ✅ **Axios Configuration** - Created centralized API client with interceptors
4. ✅ **Vite Config** - Added build optimizations and chunk splitting
5. ✅ **Run Script** - Fixed to use local Node.js installation
6. ✅ **Error Handling** - Improved across backend and frontend

## Development Notes

- Frontend uses Vite with React
- Backend uses Express.js with Node.js
- Database: MongoDB (optional)
- AI: OpenRouter API
- Styling: Tailwind CSS with custom themes
- Animations: Framer Motion

## Production Build

### Frontend
```bash
cd frontend
..\node_bin\node-v20.11.0-win-x64\npm.cmd run build
```

The build output will be in `frontend/dist`

### Deploy
The built frontend can be served by the backend:
```bash
cd backend
..\node_bin\node-v20.11.0-win-x64\npm.cmd run build
..\node_bin\node-v20.11.0-win-x64\npm.cmd start
```

This copies the frontend build to `backend/public` and serves it.
