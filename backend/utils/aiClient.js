const axios = require('axios');

const callAI = async (prompt, systemPrompt = "You are a helpful assistant.") => {
    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'mistralai/mixtral-8x7b-instruct', // Good balance of performance/cost
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: prompt }
                ],
                response_format: { type: 'json_object' } // Ensure deterministic JSON
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'HTTP-Referer': 'https://your-site.com', // Required by OpenRouter
                    'X-Title': 'AI Resume ATS'
                }
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("AI Call Failed:", error?.response?.data || error.message);
        throw new Error('AI Service Failed');
    }
};

module.exports = { callAI };
