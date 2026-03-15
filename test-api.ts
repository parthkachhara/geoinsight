import { generateFinancialAnalysis } from './src/lib/gemini';

async function run() {
    console.log("Testing API fetch for India on v1 endpoint with gemini-2.5-flash-lite...");
    const res = await generateFinancialAnalysis("India");
    if (res.error) {
        console.error("Test Failed:", res.error);
        process.exit(1);
    }
    console.log("Test Succeeded! Output:");
    console.log(JSON.stringify(res, null, 2));
    process.exit(0);
}
run();
