const compression = require('compression');

// Smart compression - only compress large responses
module.exports = compression({
    filter: (req, res) => {
        // Don't compress images or if explicitly disabled
        if (req.headers['x-no-compression']) {
            return false;
        }

        // Only compress text responses
        return compression.filter(req, res);
    },

    // Higher compression for production
    level: process.env.NODE_ENV === 'production' ? 9 : 6,

    // Compress responses > 1kb
    threshold: 1024
});
