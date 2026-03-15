'use client'

import { useState, useEffect } from 'react'
import { getSummarizedPost, votePost } from './actions'
import { ArrowUp, ArrowDown, ExternalLink, ChevronUp, AlertCircle, ShieldCheck, Flame, User, Clock, Loader2 } from "lucide-react"
import Link from 'next/link'

export default function NewsCard({ post }: { post: any }) {
    const [brief, setBrief] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true;
        async function fetchBrief() {
            try {
                // In a production app, we would cache these briefs in Firestore 
                // to avoid re-generating them every time. For this demo, we generate on the fly.
                const res = await getSummarizedPost(post.content);
                if (isMounted) {
                    setBrief(res.brief || "Summary unavailable.");
                    setLoading(false);
                }
            } catch (e) {
                if (isMounted) {
                    setBrief("Failed to generate AI summary.");
                    setLoading(false);
                }
            }
        }
        fetchBrief();
        return () => { isMounted = false };
    }, [post.content])

    // Generate a consistent placeholder gradient strictly based on the post ID
    const getGradient = (id: string) => {
        const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
        const gradients = [
            'from-blue-600 to-indigo-900',
            'from-emerald-600 to-teal-900',
            'from-amber-600 to-red-900',
            'from-purple-600 to-slate-900',
            'from-slate-700 to-slate-950'
        ]
        return gradients[hash % gradients.length]
    }

    return (
        <div className="relative h-full w-full flex flex-col bg-slate-950 overflow-hidden font-sans">
            {/* Top 40%: Image/Gradient Header */}
            <div className={`h-[50%] w-full bg-gradient-to-br ${getGradient(post.id)} relative`}>
                {/* Decorative Map Pattern overlay */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-100 via-transparent to-transparent mix-blend-overlay"></div>
                {/* Fade to Slate Bottom Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent"></div>

                {/* Neutrality Tag Overlay */}
                {post.neutrality_tag && (
                    <div className="absolute top-4 left-4 z-20">
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-lg backdrop-blur-md ${post.neutrality_score >= 70 ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                            post.neutrality_score >= 40 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                                'bg-red-500/20 text-red-300 border border-red-500/30'
                            }`}>
                            {post.neutrality_score >= 70 ? <ShieldCheck className="w-4 h-4" /> :
                                post.neutrality_score >= 40 ? <AlertCircle className="w-4 h-4" /> :
                                    <Flame className="w-4 h-4" />}
                            {post.neutrality_tag}
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom 50%: Glassmorphism Content Area */}
            <div className="h-[50%] w-full bg-slate-900/40 backdrop-blur-md px-6 pt-8 pb-20 flex flex-col relative z-20 -mt-6 rounded-t-3xl border-t border-slate-800/50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)]">

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-fraunces)] font-black text-slate-100 leading-tight mb-4 line-clamp-3">
                    {post.title}
                </h2>

                {/* AI Brief body */}
                <div className="flex-grow overflow-hidden">
                    {loading ? (
                        <div className="h-full flex flex-col items-center justify-center opacity-50 space-y-3">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                            <span className="text-sm font-medium text-slate-400">Gemini generating brief...</span>
                        </div>
                    ) : (
                        <p className="text-base md:text-lg text-slate-300 leading-relaxed font-medium">
                            {brief}
                        </p>
                    )}
                </div>

                {/* Footer Metadata */}
                <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {(post.profiles as any)?.username || 'user'}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {new Date(post.created_at).toLocaleDateString()}</span>
                    </div>

                    {post.link_url && (
                        <a href={post.link_url.startsWith('http') ? post.link_url : `https://${post.link_url}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-400 hover:text-blue-300">
                            Read Full <ExternalLink className="w-3 h-3" />
                        </a>
                    )}
                </div>
            </div>

            {/* Floating Action Buttons (Right Side) */}
            <div className="absolute bottom-24 right-4 z-30 flex flex-col gap-4">
                {/* Voting */}
                <div className="bg-slate-900/40 backdrop-blur-md rounded-full p-2 border border-slate-800/50 flex flex-col items-center gap-2 shadow-xl">
                    <button onClick={() => votePost(post.id, 1)} className="text-slate-400 hover:text-emerald-400 p-2 rounded-full hover:bg-slate-800 transition-colors">
                        <ArrowUp className="w-6 h-6" strokeWidth={2.5} />
                    </button>
                    <span className={`font-black text-sm ${post.upvotes - post.downvotes > 0 ? 'text-emerald-400' : post.upvotes - post.downvotes < 0 ? 'text-red-400' : 'text-slate-300'}`}>
                        {post.upvotes - post.downvotes}
                    </span>
                    <button onClick={() => votePost(post.id, -1)} className="text-slate-400 hover:text-red-400 p-2 rounded-full hover:bg-slate-800 transition-colors">
                        <ArrowDown className="w-6 h-6" strokeWidth={2.5} />
                    </button>
                </div>

            </div>

            {/* Bottom Swipe Indicator */}
            <div className="absolute bottom-4 left-0 w-full flex flex-col items-center justify-center z-30 opacity-60 animate-pulse pointer-events-none">
                <span className="text-[10px] tracking-widest uppercase font-bold text-slate-400 mb-1">Swipe for more</span>
                <ChevronUp className="w-5 h-5 text-slate-400" />
            </div>

        </div>
    )
}
