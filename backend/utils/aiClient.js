const axios = require('axios');

const callAI = async (prompt, systemPrompt = "You are a helpful assistant.") => {
    // 1. Check if Key exists
    if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY.startsWith('sk-or-v1-test')) {
        console.warn("⚠️ Using MOCK AI RESPONSE (Missing or Test Key)");
        return JSON.stringify({
            score: 85,
            headline: "Mock Roast: Looks Good!",
            roast: "This is a simulated response because the AI API Key is missing or invalid. The site looks clean but lacks soul.",
            quickWins: ["Add real API Key", "Check Vercel Logs", "Deploy again"],
            verdict: "Solid"
        });
    }

    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'mistralai/mixtral-8x7b-instruct',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: prompt }
                ],
                response_format: { type: 'json_object' }
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'HTTP-Referer': 'https://digitally.vercel.app',
                    'X-Title': 'AI Resume ATS'
                },
                timeout: 50000 // 50s timeout (Vercel limit is 10s for free, but good to set)
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        // DETAILED LOGGING FOR VERCEL
        console.error("❌ AI Service failed");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", JSON.stringify(error.response.data));

            // Fallback for Rate Limits or Quota issues
            if (error.response.status === 401 || error.response.status === 402 || error.response.status === 429) {
                return JSON.stringify({
                    score: 70,
                    headline: "AI Service Temporarily Unavailable",
                    roast: "Our AI is currently taking a nap (Rate Limit or Quota Exceeded). Please try again later.",
                    quickWins: ["Check OpenRouter Credits", "Retry in 1 minute"],
                    verdict: "Decent"
                });
            }
        } else {
            console.error("Error Message:", error.message);
        }
        throw new Error('AI Service Failed: ' + (error.response?.data?.error?.message || error.message));
    }
};

module.exports = { callAI };
