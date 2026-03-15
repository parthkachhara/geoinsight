import { GoogleGenAI } from '@google/genai';

// Initialize the modern @google/genai SDK on the native v1beta endpoint
export const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || ''
});

function extractJson(text: string): any {
    try {
        // Try parsing the raw text first (in case responseMimeType worked perfectly)
        return JSON.parse(text);
    } catch (e) {
        // If it fails, attempt to extract via regex
        const jsonMatch = text.match(/```(?:json)?\n([\s\S]*?)\n```/);
        if (jsonMatch && jsonMatch[1]) {
            try {
                return JSON.parse(jsonMatch[1]);
            } catch (err) { }
        }

        // Fallback: manually find first { and last }
        const startIndex = text.indexOf('{');
        const endIndex = text.lastIndexOf('}');
        if (startIndex !== -1 && endIndex !== -1) {
            let jsonStr = text.substring(startIndex, endIndex + 1);
            try {
                return JSON.parse(jsonStr);
            } catch (fallbackErr) {
                // Flatten newlines if strict parsing chokes
                const flat = jsonStr.replace(/\n/g, ' ').replace(/\r/g, '');
                return JSON.parse(flat);
            }
        }

        // If all else fails, throw an explicit error to be handled by the caller
        throw new Error("Unable to extract valid JSON from response.");
    }
}

export async function analyzeNeutrality(title: string, content: string): Promise<{ score: number, tag: string }> {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your-gemini-api-key') {
        const hash = title.length + content.length;
        const tags = ["Highly Objective", "Slightly Biased", "Strongly Opinionated", "Pro-Western Bias", "State Media Narrative"];
        return { score: (hash % 60) + 30, tag: tags[hash % tags.length] };
    }

    const maxRetries = 3;
    let delayMs = 15000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const prompt = `Analyze the following geopolitical post for neutrality and bias.
Title: ${title}
Content: ${content}

Return ONLY a JSON object with two keys:
- "score": An integer from 0 to 100 where 100 is completely neutral and objective, and 0 is heavily biased or propagandistic.
- "tag": A short 2-3 word summary of the bias (e.g., "Highly Neutral", "Pro-Western Bias", "Strongly Opinionated").`;

            const response = await ai.models.generateContent({
                model: 'gemini-1.5-flash',
                contents: prompt,
                config: {
                    temperature: 0.1,
                }
            });

            const resultText = response.text;
            if (resultText) {
                try {
                    const json = extractJson(resultText);
                    return {
                        score: json.score ?? 50,
                        tag: json.tag ?? "Unverified"
                    };
                } catch (parseError) {
                    console.error("JSON parse error in Neutrality:", parseError);
                }
            }
        } catch (e: any) {
            if (e.status === 429 && attempt < maxRetries) {
                console.warn(`⏳ Rate Limit Hit in Neutrality. Waiting ${delayMs / 1000}s...`);
                await new Promise(r => setTimeout(r, delayMs));
                delayMs *= 2;
                continue;
            }
            console.error("Gemini Neutrality analysis failed:", e);
            break;
        }
    }

    return { score: 50, tag: "Analysis Failed" };
}

export async function generateFinancialAnalysis(country: string): Promise<{
    error?: string;
    country?: string;
    cagr?: string;
    investment_sectors?: Array<{
        sector: string;
        performance: string;
        top_companies: string[];
    }>;
    indices?: string[];
}> {
    const maxRetries = 3;
    let delayMs = 15000; // Start with a 15-second delay to clear the 15 RPM bucket

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const prompt = `You are a financial data API. Return ONLY a JSON object. Do not include any markdown formatting, backticks, or introductory text. Use this exact structure:
{
"country": "string",
"cagr": "string",
"investment_sectors": [
{"sector": "string", "performance": "string", "top_companies": ["string"]}
],
"indices": ["string"]
}`;

            const response = await ai.models.generateContent({
                model: 'gemini-1.5-flash',
                contents: prompt + `\nAnalyze ${country}.`,
                config: {
                    temperature: 0.1,
                    maxOutputTokens: 2500,
                }
            });

            const resultText = response.text;
            if (resultText) {
                try {
                    return JSON.parse(resultText);
                } catch (parseError) {
                    console.error("==========================================");
                    console.error("🚨 CRITICAL JSON PARSE ERROR 🚨");
                    console.error("RAW RESPONSE SENT BY AI:");
                    console.error(resultText);
                    console.error("==========================================");
                    return { error: "Failed to parse API JSON response." }
                }
            }
        } catch (e: any) {
            if (e.status === 429 && attempt < maxRetries) {
                console.warn(`⏳ Rate Limit Hit (429). Waiting ${delayMs / 1000}s before retry ${attempt}/${maxRetries}...`);
                await new Promise(resolve => setTimeout(resolve, delayMs));
                delayMs *= 2; // Exponential backoff
                continue; // Retry the loop
            }

            // Construct the exact URL we attempted to hit just for debug logging
            const keyVal = process.env.GEMINI_API_KEY || 'MISSING_KEY';
            const safeKey = keyVal.substring(0, 8) + '...';
            const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${safeKey}`;

            console.error("==========================================");
            console.error("🚨 SDK API REQUEST FAILED 🚨");
            console.error(`🌐 EXACT FETCH URL LOG: ${url}`);
            console.error("==========================================");
            console.error("Gemini Financial analysis failed:", e);
            return { error: `AI Analysis Failed: ${e.message || "Unknown error"}` };
        }
    }

    return {
        error: "Failed to generate financial analysis. The API response was empty."
    };
}

export async function analyzeEventSectors(event: string): Promise<{
    error?: string,
    safeHaven?: Array<{ name: string, risk: string }>,
    highRisk?: Array<{ name: string, risk: string }>,
    advice?: Array<string>
}> {


    const maxRetries = 3;
    let delayMs = 15000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const prompt = `Based on the geopolitical event "${event}", analyze the market impact.
Identify 2 "Safe Haven" sectors and 2 "High Risk" sectors. Provide 3 extremely brief bullet points (under 10 words each) of investment advice. 
Be fast and highly decisive.
Return ONLY valid JSON in this format. Ensure all strings are properly escaped and do not contain raw newlines:
{
  "safeHaven": [{"name": "Sector Name", "risk": "LOW" | "MODERATE"}],
  "highRisk": [{"name": "Sector Name", "risk": "HIGH" | "SEVERE"}],
  "advice": ["Brief advice 1", "Brief advice 2", "Brief advice 3"]
}`;

            const response = await ai.models.generateContent({
                model: 'gemini-1.5-flash',
                contents: prompt,
                config: {
                    temperature: 0.1,
                    maxOutputTokens: 1500,
                }
            });

            const resultText = response.text;
            if (resultText) {
                try {
                    return extractJson(resultText);
                } catch (parseError) {
                    console.error("JSON Parse Error in Insight Analysis. Raw matched text:", resultText);
                    return { error: "Failed to parse API JSON response." }
                }
            }
        } catch (e: any) {
            if (e.status === 429 && attempt < maxRetries) {
                console.warn(`⏳ Rate Limit Hit in Event Sectors. Waiting ${delayMs / 1000}s...`);
                await new Promise(r => setTimeout(r, delayMs));
                delayMs *= 2;
                continue;
            }
            console.error("Gemini Impact analysis failed:", e);
            return { error: `AI Analysis Failed: ${e.message || "Unknown error"}` };
        }
    }

    return { error: "Failed to generate insight analysis. The API response was unparseable." };
}

export async function generateBrief(content: string): Promise<{ brief: string, error?: string }> {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your-gemini-api-key') {
        return { brief: "API Key missing. Unable to generate brief." };
    }

    const maxRetries = 3;
    let delayMs = 15000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const prompt = `You are an expert news editor for a fast-paced geopolitical app. 
Summarize the following content into a highly engaging, factual, and strictly concise brief.
CRITICAL: The brief MUST be 60 words or less. Do not exceed 60 words.

Content to summarize:
${content}

Return ONLY a JSON object in this exact format. Ensure the string is properly escaped and contains no raw newlines:
{
  "brief": "Your extremely concise 60-word summary here."
}`;

            const response = await ai.models.generateContent({
                model: 'gemini-1.5-flash',
                contents: prompt,
                config: {
                    temperature: 0.1,
                    maxOutputTokens: 200,
                }
            });

            const resultText = response.text;
            if (resultText) {
                try {
                    const json = extractJson(resultText);
                    return { brief: json.brief || "Failed to parse brief from JSON." };
                } catch (parseError) {
                    console.error("JSON Parse Error in Brief:", parseError);
                }
            }
        } catch (e: any) {
            if (e.status === 429 && attempt < maxRetries) {
                console.warn(`⏳ Rate Limit Hit in Brief. Waiting ${delayMs / 1000}s...`);
                await new Promise(r => setTimeout(r, delayMs));
                delayMs *= 2;
                continue;
            }
            console.error("Gemini Brief generation failed:", e);
            return { brief: "", error: `AI Summarization Failed: ${e.message || "Unknown error"}` };
        }
    }

    return { brief: "", error: "Failed to generate brief. Response was empty." };
}
