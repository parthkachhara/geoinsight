const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });

async function test() {
    console.log("Key:", process.env.GEMINI_API_KEY?.substring(0, 10));
    try {
        console.log("Checking available models...");
        const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = await response.json();

        console.log("Available Models:");
        data.models.forEach(m => console.log(m.name, m.supportedGenerationMethods?.includes('generateContent') ? '(Supports generateContent)' : ''));
    } catch (e) {
        console.error("Error with gemini-1.5-flash:", e.message);
    }
}

test();
