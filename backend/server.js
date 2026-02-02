const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const smartCompress = require('./middleware/compress');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Ensure uploads directory exists
// Ensure uploads directory exists (Use /tmp for serverless/readonly envs)
const fs = require('fs');
const os = require('os');
const path = require('path');

// Safe Upload Directory Logic
const isServerless = process.env.NODE_ENV === 'production' || process.env.VERCEL;
const UPLOAD_DIR = isServerless ? os.tmpdir() : 'uploads';

try {
    if (UPLOAD_DIR !== os.tmpdir() && !fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR);
    }
} catch (err) {
    console.warn("⚠️ Could not create upload directory. functionality might be limited.", err.message);
}

app.use(smartCompress);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health Check with Diagnostics
app.get('/api/health', (req, res) => {
    const mongoose = require('mongoose');
    res.status(200).json({
        status: 'ok',
        env: {
            node_env: process.env.NODE_ENV,
            is_serverless: isServerless,
            has_mongo: !!process.env.MONGO_URI,
            has_ai_key: !!process.env.OPENROUTER_API_KEY,
            mongo_connected: mongoose.connection.readyState === 1
        },
        upload_dir: UPLOAD_DIR
    });
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/resumes', require('./routes/resumeRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// SPA Fallback logic
const path = require('path');
const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath, {
    maxAge: '1y',
    setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
            res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        }
    }
}));

app.get('*', (req, res) => {
    if (!req.url.startsWith('/api')) {
        res.sendFile(path.join(publicPath, 'index.html'));
    }
});

// Error Handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
});


const PORT = process.env.PORT || 5000;

// Export for Vercel (Serverless)
module.exports = app;

// Only listen if run directly (Local dev or VPS)
if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
