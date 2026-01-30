const express = require('express');
const router = express.Router();
const {
    chatWithConsultant,
    generateContent,
    rewriteBullet
} = require('../controllers/chatController');
const { protect, optionalProtect } = require('../middleware/authMiddleware');

router.post('/consultant', protect, chatWithConsultant);
router.post('/content', protect, generateContent);
router.post('/rewrite', optionalProtect, rewriteBullet);

module.exports = router;
