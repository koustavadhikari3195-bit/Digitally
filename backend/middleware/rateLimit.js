const rateLimit = require('express-rate-limit');

// General API rate limiter (100 requests per 15 minutes)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: {
        error: 'Too many requests, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Stricter limiter for AI endpoints (10 requests per 15 minutes to prevent API cost abuse)
const aiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: {
        error: 'AI request limit reached. Please try again in 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Very strict limiter for computationally expensive operations
const strictLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5,
    message: {
        error: 'Rate limit exceeded. Please try again in an hour.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { apiLimiter, aiLimiter, strictLimiter };