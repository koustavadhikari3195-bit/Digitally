const express = require('express');
const router = express.Router();
const { createSubscriptionOrder, razorpayWebhook } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/subscribe', protect, createSubscriptionOrder);
router.post('/webhook', razorpayWebhook);

module.exports = router;
