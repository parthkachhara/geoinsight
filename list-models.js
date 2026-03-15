const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: "AIzaSyAxZlMmtqGoKAWRB1oOtmPxyDTnpnVuQ-E" });

async function listModels() {
    try {
        const response = await ai.models.list();
        for await (const model of response) {
            console.log(model.name);
        }
    } catch (e) {
        console.error(e);
    }
}

listModels();
