/**
 * Robustly parses AI responses that might be wrapped in markdown or contain preamble text.
 */
const parseAIResponse = (text) => {
    try {
        // Try direct parse first
        return JSON.parse(text);
    } catch (e) {
        // Look for JSON block in markdown { ... }
        // This regex handles nested braces by finding the first { and last }
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            try {
                return JSON.parse(jsonMatch[0]);
            } catch (innerError) {
                console.error("Nested JSON parse failed. Raw match:", jsonMatch[0]);
                // If it still fails, try to strip common AI markdown artifacts
                const stripped = jsonMatch[0]
                    .replace(/```json/g, '')
                    .replace(/```/g, '')
                    .trim();
                try {
                    return JSON.parse(stripped);
                } catch (evenMoreInnerError) {
                    console.error("Stripped JSON parse also failed.");
                }
            }
        }
        console.error("Original AI Response was:", text);
        throw new Error("Could not parse AI response as JSON");
    }
};

module.exports = { parseAIResponse };
