import { votePost, deletePost } from '@/app/pulse/actions'
import Link from 'next/link'
import { Plus, ExternalLink, Trash2, TrendingUp, Clock, User, MessageSquare, AlertCircle, ShieldCheck, Flame, ArrowUp, ArrowDown, Activity, Loader2 } from "lucide-react"
import { db } from '@/lib/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { Suspense } from 'react'
import InshortsFeed from './InshortsFeed'

export const revalidate = 0; // Disable caching for pulse data

export default async function PulsePage() {
    let posts: any[] = [];
    try {
        const q = query(collection(db, 'posts'), orderBy('created_at', 'desc'));
        const querySnapshot = await getDocs(q);
        posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
        console.error("Error fetching posts:", e);
    }

    // Because we are using 100vh for the swipe logic, we strip away the structural padding on the parent page
    return (
        <div className="w-full">
            <Suspense fallback={
                <div className="h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-400 gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                    <p className="font-medium">Initializing News Deck...</p>
                </div>
            }>
                <InshortsFeed posts={posts} />
            </Suspense>
        </div>
    )
}


