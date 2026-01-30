const Razorpay = require('razorpay');
const crypto = require('crypto');
const User = require('../models/User');

// Mock Razorpay if credentials are missing
let razorpay;
const MOCK_PAYMENTS = !process.env.RAZORPAY_KEY_ID;

if (!MOCK_PAYMENTS) {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
} else {
    console.log("⚠️ Razorpay keys missing. Running in FREE/MOCK payment mode.");
}

// @desc    Create Subscription Order
// @route   POST /api/payments/subscribe
// @access  Private
const createSubscriptionOrder = async (req, res) => {
    try {
        const { planId } = req.body;

        if (MOCK_PAYMENTS) {
            // Simulate instant success order
            return res.json({
                id: `order_mock_${Date.now()}`,
                amount: planId === 'pro_monthly' ? 199900 : 49900,
                currency: "INR",
                notes: { planId, isMock: true }
            });
        }

        // Define amounts (in paise)
        let amount = 0;
        if (planId === 'pro_monthly') amount = 199900; // ₹1,999
        if (planId === 'one_time_pass') amount = 49900; // ₹499

        if (amount === 0) return res.status(400).json({ message: 'Invalid Plan' });

        const options = {
            amount: amount,
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
            notes: {
                userId: req.user.id,
                planId: planId
            }
        };

        const order = await razorpay.orders.create(options);

        res.json(order);

    } catch (error) {
        console.error(error);
        res.status(500).send("Payment initiation failed");
    }
};

// @desc    Verify Payment Webhook
// @route   POST /api/payments/webhook
// @access  Public (Razorpay calls this)
const razorpayWebhook = async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Verify Signature
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if (digest === req.headers['x-razorpay-signature']) {
        console.log('Webhook verified');

        const event = req.body.event;
        const payload = req.body.payload;

        if (event === 'payment.captured') {
            const { notes } = payload.payment.entity;
            const userId = notes.userId;
            const planId = notes.planId;

            if (userId) {
                const user = await User.findById(userId);
                if (user) {
                    if (planId === 'pro_monthly') {
                        user.plan = 'pro';
                        user.credits = 9999; // Unlimited effectively
                    } else if (planId === 'one_time_pass') {
                        user.credits += 5; // Add 5 credits
                    }
                    await user.save();
                }
            }
        }

        res.status(200).json({ status: 'ok' });
    } else {
        res.status(400).json({ status: 'invalid_signature' });
    }
};

module.exports = {
    createSubscriptionOrder,
    razorpayWebhook
};
