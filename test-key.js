const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: "AIzaSyAxZlMmtqGoKAWRB1oOtmPxyDTnpnVuQ-E" });

async function testKey() {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: 'Say hello',
        });
        console.log("SUCCESS:", response.text);
    } catch (e) {
        console.error("FAILED:", e);
    }
}

testKey();
