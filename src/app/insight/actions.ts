'use server'

import { analyzeEventSectors } from '@/lib/gemini'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'

export async function getInsightSectors(locationContext?: string) {
    try {
        // Fetch the 3 most recent posts from Firestore
        const q = query(collection(db, 'posts'), orderBy('created_at', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);
        const postsText = querySnapshot.docs
            .map(doc => {
                const data = doc.data();
                return `Title: ${data.title}\nContent: ${data.content}`;
            })
            .join('\n\n');

        if (!postsText) {
            return { error: 'No recent posts found in the community to analyze.' };
        }

        const promptPayload = locationContext
            ? `Specific Location Context: ${locationContext}\n\nRecent Geopolitical Events:\n${postsText}`
            : `Recent Geopolitical Events:\n${postsText}`;

        const data = await analyzeEventSectors(promptPayload);

        if (data.error) {
            return { error: data.error }
        }

        return { data: data as any }
    } catch (e: any) {
        console.error("Error fetching or analyzing posts:", e);
        return { error: e.message || 'Failed to generate insights from recent posts.' }
    }
}
