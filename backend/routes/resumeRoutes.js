const express = require('express');
const router = express.Router();
const { uploadResume, analyzeResume, getResume, listResumes } = require('../controllers/resumeController');
const { protect, optionalProtect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', optionalProtect, upload.single('resume'), uploadResume);
router.get('/', optionalProtect, listResumes);
router.get('/:id', optionalProtect, getResume);
router.post('/:id/analyze', optionalProtect, analyzeResume);

module.exports = router;
