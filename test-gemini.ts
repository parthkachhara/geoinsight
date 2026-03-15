import { generateCoreAnalysis } from "./src/lib/gemini.ts";

async function run() {
    const data = await generateCoreAnalysis("USA", "India");
    console.log(JSON.stringify(data, null, 2));
}

run();
