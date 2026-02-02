const express = require('express');
const router = express.Router();
const { callAI } = require('../utils/aiClient');
const { parseAIResponse } = require('../utils/parser');
const Lead = require('../models/Lead');
const { sendTelegram } = require('../utils/telegram');
const cache = require('../utils/cache');
const queue = require('../utils/queue');

// @desc    AI Chat for agency assistant
// @route   POST /api/ai/chat
// @access  Public
router.post('/chat', async (req, res) => {
    try {
        const { message, history = [] } = req.body;

        const systemPrompt = `You are the AI assistant for "Digitally", an elite digital agency. 
Your personality: Confident, witty, slightly provocative but professional. You speak like a top-tier creative director.
Services we offer:
- Strategic Digital Marketing (PPC, Social Media, Content)
- Elite Web Development (React, Next.js, Custom Sites)
- SEO & Meta Domination (Technical SEO, Backlinking)
- AI Resume Optimization Tool (ATS scoring, rewriting)

Rules:
1. Keep responses SHORT (2-3 sentences max unless asked for details)
2. Be confident and slightly bold
3. Always guide toward booking a consultation
4. Never make up pricing - say "Let's discuss on a call"`;

        const messages = [
            { role: 'system', content: systemPrompt },
            ...history.map(h => ({ role: h.role, content: h.content })),
            { role: 'user', content: message }
        ];

        const response = await callAI(message, systemPrompt);

        res.json({ reply: response });
    } catch (error) {
        console.error('Chat AI Error:', error);
        res.status(500).json({ reply: "I'm having a moment. Try again?" });
    }
});

// @desc    Roast a website
// @route   POST /api/ai/roast-website
// @access  Public
router.post('/roast-website', async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        // 1. Check in-memory cache first (Faster than DB)
        const cacheKey = `roast-${url}`;
        const cached = cache.get(cacheKey);
        if (cached) {
            return res.json(cached);
        }

        // 2. Check for cached roast in DB (last 24 hours) as fallback
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const dbCachedRoast = await Lead.findOne({
            type: 'roast',
            message: `URL: ${url}`,
            createdAt: { $gte: twentyFourHoursAgo }
        });

        if (dbCachedRoast) {
            cache.set(cacheKey, dbCachedRoast.details); // Hydrate in-memory cache
            return res.json(dbCachedRoast.details);
        }

        const systemPrompt = `You are a brutally honest website critic with 20 years of UX/UI and marketing experience.
You've seen every trend and you're not impressed easily. Your roasts are LEGENDARY in the industry.

Output STRICTLY as JSON:
{
    "score": number (0-100),
    "headline": "string (witty one-liner roast)",
    "roast": "string (2-3 sentence brutal but constructive critique)",
    "quickWins": ["string", "string", "string"] (3 things they can fix TODAY),
    "verdict": "string (one word: 'Tragic', 'Meh', 'Decent', 'Solid', 'Chef's Kiss')"
}`;

        const prompt = `Roast this website: ${url}
        
Analyze it as if you can see it (use your knowledge of common website patterns based on the domain/URL structure).
Be witty, be harsh, but be helpful. We want them to hire us to fix it.`;

        // Direct call for Serverless (Queue doesn't work well in Lambda)
        const response = await callAI(prompt, systemPrompt);

        const parsed = parseAIResponse(response);

        // Log to Database as a Lead
        await Lead.create({
            service: 'Website Roast',
            message: `URL: ${url}`,
            type: 'roast',
            details: parsed
        });

        // Store in memory cache
        cache.set(cacheKey, parsed);

        res.json(parsed);

        // Send Telegram Alert (Non-blocking)
        sendTelegram(`🔥 *New Website Roast!*\n\n*URL:* ${url}\n*Score:* ${parsed.score}\n*Verdict:* ${parsed.verdict}\n\n*Outcome:* ${parsed.headline}`).catch(err => console.error('Telegram Roast Alert Error:', err));
    } catch (error) {
        console.error('Roast AI Error:', error);
        res.status(500).json({
            score: 42,
            headline: "We tried to roast it but our AI is speechless.",
            roast: "Either this site broke our AI or it's so perfect we have nothing to say. Probably the first one.",
            quickWins: ["Try a different URL", "Make sure the site exists", "Maybe it's too good?"],
            verdict: "Mystery"
        });
    }
});

// @desc    AI-powered lead qualification and recommendation
// @route   POST /api/ai/qualify-lead
// @access  Public
router.post('/qualify-lead', async (req, res) => {
    try {
        const { businessType, currentWebsite, biggestChallenge, budget, timeline } = req.body;

        const systemPrompt = `You are a senior sales consultant for "Digitally", an elite digital agency.
Based on lead info, provide a personalized recommendation that makes them NEED to book a call.

Output STRICTLY as JSON:
{
    "headline": "string (personalized hook mentioning their industry)",
    "diagnosis": "string (2 sentences identifying their exact pain point)",
    "recommendedServices": ["string", "string"] (max 2 services we can help with),
    "potentialROI": "string (a bold but believable ROI prediction like '3x traffic in 90 days')",
    "urgency": "string (why they should act NOW)",
    "nextStep": "string (specific call-to-action)"
}`;

        const prompt = `Qualify this lead:
- Business Type: ${businessType}
- Current Website: ${currentWebsite || 'None provided'}
- Biggest Challenge: ${biggestChallenge}
- Budget Range: ${budget}
- Timeline: ${timeline}

Make them feel understood and create urgency without being pushy.`;

        // Direct call for Serverless
        const response = await callAI(prompt, systemPrompt);

        const parsed = parseAIResponse(response);

        // Log to Database as a Lead
        await Lead.create({
            service: businessType,
            budget: budget,
            message: `Challenge: ${biggestChallenge}`,
            type: 'qualify',
            details: {
                ...parsed,
                timeline,
                currentWebsite
            }
        });

        res.json(parsed);

        // Send Telegram Alert (Non-blocking)
        sendTelegram(`🎯 *New Qualified Lead!*\n\n*Type:* ${businessType}\n*Budget:* ${budget}\n*Challenge:* ${biggestChallenge}\n*ROI Prediction:* ${parsed.potentialROI}`).catch(err => console.error('Telegram Qualification Alert Error:', err));
    } catch (error) {
        console.error('Lead Qualification Error:', error);
        res.status(500).json({
            headline: "Let's Talk Strategy",
            diagnosis: "Your business has unique challenges that deserve a custom approach.",
            recommendedServices: ["Strategic Consultation", "Growth Audit"],
            potentialROI: "Significant growth potential identified",
            urgency: "The digital landscape moves fast—early movers win.",
            nextStep: "Book a free 15-minute strategy call"
        });
    }
});

// @desc    Generate AI testimonial response
// @route   POST /api/ai/generate-response  
// @access  Public
router.post('/generate-response', async (req, res) => {
    try {
        const { clientName, projectType, feedback } = req.body;

        const systemPrompt = `You are crafting a professional response to client feedback.
Be warm, professional, and encourage referrals subtly.

Output STRICTLY as JSON:
{
    "response": "string (2-3 sentence professional thank you)",
    "followUp": "string (suggestion for continued partnership)"
}`;

        const prompt = `Respond to this feedback:
Client: ${clientName}
Project: ${projectType}
Feedback: ${feedback}`;

        const response = await callAI(prompt, systemPrompt);
        const parsed = parseAIResponse(response);

        res.json(parsed);
    } catch (error) {
        console.error('Response Generation Error:', error);
        res.status(500).json({
            response: "Thank you for your kind words!",
            followUp: "We'd love to continue our partnership."
        });
    }
});

module.exports = router;

