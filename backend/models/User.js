const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    // Simple magic link auth implementation usually requires a token stored
    verificationToken: String,
    verificationTokenExpire: Date,

    plan: {
        type: String,
        enum: ['free', 'pro', 'one_time'],
        default: 'free'
    },
    credits: {
        type: Number,
        default: 1 // Freemium limit: 1 free scan
    },
    subscriptionId: String, // Razorpay Subscription ID
    subscriptionStatus: String // active, past_due, etc.
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
