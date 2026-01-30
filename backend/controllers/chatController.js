const { callAI } = require('../utils/aiClient');
const {
    CAREER_CONSULTANT_PROMPT,
    LINKEDIN_CONTENT_PROMPT,
    RESUME_REWRITE_PROMPT
} = require('../utils/prompts');
const { parseAIResponse } = require('../utils/parser');
const User = require('../models/User');

// @desc    Chat with Career Consultant
// @route   POST /api/chat/consultant
// @access  Private
const chatWithConsultant = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Message required' });
        }

        const response = await callAI(message, CAREER_CONSULTANT_PROMPT);

        // Return as plain text or JSON depending on what callAI returns. 
        // Consultant prompt returns text.
        res.json({ reply: response });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Chat failed' });
    }
};

// @desc    Generate LinkedIn Content
// @route   POST /api/chat/content
// @access  Private (Paid Feature usually, but open for now)
const generateContent = async (req, res) => {
    try {
        const { topic } = req.body;

        if (!topic) {
            return res.status(400).json({ message: 'Topic required' });
        }

        const response = await callAI(topic, LINKEDIN_CONTENT_PROMPT);
        const jsonResponse = parseAIResponse(response);

        res.json(jsonResponse);
    } catch (error) {
        console.error("Content Gen Error:", error);
        res.status(500).json({ message: 'Content generation failed' });
    }
};

// @desc    Rewrite Resume Bullet Point
// @route   POST /api/chat/rewrite
// @access  Private
const rewriteBullet = async (req, res) => {
    try {
        const { bullet } = req.body;

        if (!bullet) {
            return res.status(400).json({ message: 'Bullet point required' });
        }

        const response = await callAI(bullet, RESUME_REWRITE_PROMPT);
        const jsonResponse = parseAIResponse(response);

        // Align with frontend expectation (AnalysisResults.jsx line 52: response.data.rewritten)
        const bestOption = jsonResponse.rewritten_options?.[0]?.text || "No options provided";
        const explanation = jsonResponse.explanation || "";

        res.json({
            ...jsonResponse,
            rewritten: `${bestOption}\n\nRationale: ${explanation}`
        });

    } catch (error) {
        console.error("Rewrite Error:", error);
        res.status(500).json({ message: 'Rewrite failed' });
    }
};

module.exports = {
    chatWithConsultant,
    generateContent,
    rewriteBullet
};
