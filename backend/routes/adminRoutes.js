const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const User = require('../models/User');

const AdminUser = process.env.ADMIN_USER || 'admin';
const AdminPass = process.env.ADMIN_PASS || 'password';

// Middleware to protect admin routes
const protectAdmin = (req, res, next) => {
    const authHeader = req.headers['x-admin-auth'];
    // Simple check: header must be "base64(user:pass)" or just a plain token
    // For simplicity, we'll check if it matches a simple combined string
    const expectedToken = Buffer.from(`${AdminUser}:${AdminPass}`).toString('base64');

    if (authHeader === expectedToken) {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as admin' });
    }
};

// @desc    Admin login
// @route   POST /api/admin/login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === AdminUser && password === AdminPass) {
        const token = Buffer.from(`${username}:${password}`).toString('base64');
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid ID or password' });
    }
});

// @desc    Get all leads
// @route   GET /api/admin/leads
// @access  Private
router.get('/leads', protectAdmin, async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update lead status
// @route   PATCH /api/admin/leads/:id
// @access  Private
router.patch('/leads/:id', protectAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        const lead = await Lead.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(lead);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get Stats for Dashboard
// @route   GET /api/admin/stats
// @access  Private
router.get('/stats', protectAdmin, async (req, res) => {
    try {
        const totalLeads = await Lead.countDocuments();
        const newLeads = await Lead.countDocuments({ status: 'new' });
        const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5);

        // Count by type
        const statsByType = await Lead.aggregate([
            { $group: { _id: '$type', count: { $sum: 1 } } }
        ]);

        res.json({
            totalLeads,
            newLeads,
            recentLeads,
            statsByType
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
