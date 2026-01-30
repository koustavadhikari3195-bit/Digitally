const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    const { email } = req.body;

    // Simple check
    if (!email) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
        email,
        isVerified: true // Auto verify for simplicity as requested "simple auth"
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
            token: generateToken(user.id),
            credits: user.credits,
            plan: user.plan
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Login user (Mock for email-based)
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        res.json({
            _id: user.id,
            email: user.email,
            token: generateToken(user.id),
            credits: user.credits,
            plan: user.plan
        });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
};

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        id: user.id,
        email: user.email,
        credits: user.credits,
        plan: user.plan
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe
};
