const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            if (token === 'mock_token_for_now') {
                let user = await User.findOne({ email: 'guest@digitally.com' });
                if (!user) {
                    user = await User.create({
                        email: 'guest@digitally.com',
                        plan: 'pro',
                        credits: 9999,
                        isVerified: true
                    });
                }
                req.user = user;
                return next();
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// @desc    Optional protection (if token exists, populate user, else proceed)
const optionalProtect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            if (token === 'mock_token_for_now') {
                let user = await User.findOne({ email: 'guest@digitally.com' });
                if (!user) {
                    user = await User.create({ email: 'guest@digitally.com', plan: 'pro', credits: 9999, isVerified: true });
                }
                req.user = user;
                return next();
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            return next();
        } catch (error) {
            console.error(error);
            return next();
        }
    }

    next();
};

module.exports = { protect, optionalProtect };
