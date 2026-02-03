const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
        email,
        password,
        isVerified: true
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

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
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
