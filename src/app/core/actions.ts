'use server'

import { generateFinancialAnalysis } from '@/lib/gemini'

export async function getFinancialAnalysis(country: string) {
    if (!country) {
        return { error: 'Country name is required.' }
    }

    const data = await generateFinancialAnalysis(country)

    console.log("Gemini Financial Output:", JSON.stringify(data, null, 2))

    if (data.error) {
        return { error: data.error }
    }

    return { data: data as any }
}
