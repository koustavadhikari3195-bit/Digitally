const Resume = require('../models/Resume');
const User = require('../models/User');
const { callAI } = require('../utils/aiClient');
const fs = require('fs');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');

const { parseAIResponse } = require('../utils/parser');

// @desc    Upload new resume
// @route   POST /api/resumes
// @access  Private
const uploadResume = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    try {
        let parsedText = "";

        if (req.file.mimetype === 'application/pdf') {
            try {
                const dataBuffer = fs.readFileSync(req.file.path);
                const data = await pdf(dataBuffer);
                parsedText = data.text;
            } catch (pdfError) {
                console.error("PDF parsing error:", pdfError);
                parsedText = "Error extracting text from PDF. The file may be corrupted or image-based.";
            }
        } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            req.file.mimetype === 'application/msword') {
            try {
                const dataBuffer = fs.readFileSync(req.file.path);
                const result = await mammoth.extractRawText({ buffer: dataBuffer });
                parsedText = result.value;
            } catch (docError) {
                console.error("Word document parsing error:", docError);
                parsedText = "Error extracting text from Word document.";
            }
        } else {
            parsedText = "Text extraction for this format not yet implemented.";
        }

        const resume = await Resume.create({
            user: req.user ? req.user.id : null,
            originalName: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size,
            filePath: req.file.path,
            parsedText: parsedText
        });

        res.status(201).json(resume);
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).send('Server Error');
    }
};

// @desc    Analyze resume
// @route   POST /api/resumes/:id/analyze
// @access  Private
const analyzeResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        const user = req.user ? await User.findById(req.user.id) : null;

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        if (resume.user && (!req.user || resume.user.toString() !== req.user.id)) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        // Freemium check (only for logged-in users, guests have no credits to deduct)
        if (req.user && req.user.credits <= 0 && req.user.plan === 'free') {
            return res.status(403).json({ message: 'No credits remaining. Please upgrade.' });
        }

        const { ATS_ANALYSIS_PROMPT } = require('../utils/prompts');

        const prompt = `${ATS_ANALYSIS_PROMPT}
            
            RESUME TEXT:
            ${resume.parsedText}
        `;

        const aiResponse = await callAI(prompt, "You are an expert ATS Resume Auditor.");

        try {
            const analysisData = parseAIResponse(aiResponse);
            resume.analysisResult = {
                score: analysisData.score,
                summary: analysisData.summary,
                top_skills: analysisData.top_skills,
                missing_keywords: analysisData.missing_keywords,
                critical_issues: analysisData.critical_issues,
                improvement_plan: analysisData.improvement_plan,
                job_match_prediction: analysisData.job_match_prediction
            };
            await resume.save();

            // Deduct credit if user is logged in and on free plan
            if (req.user && user && req.user.plan === 'free') {
                user.credits -= 1;
                await user.save();
            }

            res.json(resume);
        } catch (parseError) {
            console.error("AI Response Parsing Failed:", aiResponse);
            return res.status(500).json({ message: 'Could not categorize analysis result' });
        }

    } catch (error) {
        console.error("Analysis Error:", error);
        res.status(500).json({ message: 'Analysis failed' });
    }
};

// @desc    Get resume by ID
// @route   GET /api/resumes/:id
// @access  Private
const getResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        if (resume.user && (!req.user || resume.user.toString() !== req.user.id)) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        res.json(resume);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    List user's resumes
// @route   GET /api/resumes
// @access  Private
const listResumes = async (req, res) => {
    try {
        const { ids } = req.query; // Support fetching specific IDs for guests

        let query = {};
        const conditions = [];

        if (req.user) {
            conditions.push({ user: req.user.id });
        }

        if (ids) {
            conditions.push({ _id: { $in: ids.split(',') } });
        }

        if (conditions.length === 0) {
            return res.json([]);
        }

        query = { $or: conditions };

        const resumes = await Resume.find(query)
            .sort({ createdAt: -1 })
            .select('originalName createdAt analysisResult.score');
        res.json(resumes);
    } catch (error) {
        console.error("List Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    uploadResume,
    analyzeResume,
    getResume,
    listResumes
};
