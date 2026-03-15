'use client'

import { useState, useEffect } from 'react'
import { getSummarizedPost, votePost } from '@/app/pulse/actions'
import { ShieldCheck, AlertCircle, Flame, ArrowUp, ArrowDown, ExternalLink, Activity } from "lucide-react"

function PulseCompactCard({ post }: { post: any }) {
    const [brief, setBrief] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true;
        async function fetchBrief() {
            try {
                const res = await getSummarizedPost(post.content);
                if (isMounted) {
                    setBrief(res.brief || "Summary unavailable.");
                    setLoading(false);
                }
            } catch (e) {
                if (isMounted) setBrief("Failed to generate AI summary.");
                if (isMounted) setLoading(false);
            }
        }
        fetchBrief();
        return () => { isMounted = false };
    }, [post.content])



    return (
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col group relative">

            {/* Tag overlay */}
            {post.neutrality_tag && (
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase shadow-lg backdrop-blur-md bg-slate-900/80 border border-slate-700/50 text-slate-300">
                    {post.neutrality_score >= 70 ? <ShieldCheck className="w-3 h-3 text-cyan-400" /> :
                        post.neutrality_score >= 40 ? <AlertCircle className="w-3 h-3 text-amber-400" /> :
                            <Flame className="w-3 h-3 text-red-400" />}
                    {post.neutrality_tag}
                </div>
            )}

            <div className="flex p-4 gap-4">
                {/* Thumbnail */}
                {post.image_url ? (
                    <div className="w-20 h-24 rounded-xl shrink-0 relative overflow-hidden border border-slate-700/50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.image_url} alt="Cover" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.6)] mix-blend-overlay pointer-events-none"></div>
                    </div>
                ) : (
                    <div className="w-20 h-24 rounded-xl shrink-0 bg-slate-900/40 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-cyan-500/30 transition-colors">
                        {/* Fake Radar / Grid effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:8px_8px]"></div>
                        <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>

                        <div className="relative z-10 flex flex-col items-center">
                            <Activity className="w-5 h-5 text-cyan-500/50 mb-1 group-hover:text-cyan-400 group-hover:animate-pulse transition-all" />
                            <span className="text-[9px] font-[family-name:var(--font-geist-mono)] text-slate-500 uppercase tracking-widest font-bold">Node</span>
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-slate-100 leading-snug line-clamp-2 mb-2 font-sans group-hover:text-cyan-400 transition-colors pr-6">
                            {post.title}
                        </h3>
                        {loading ? (
                            <div className="h-4 w-2/3 bg-slate-800 animate-pulse rounded"></div>
                        ) : (
                            <p className="text-xs text-slate-400 leading-relaxed max-w-[95%]">
                                {brief}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                        <button onClick={() => votePost(post.id, 1)} className="text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-1">
                            <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[10px] font-[family-name:var(--font-geist-mono)] text-slate-400">
                            {post.upvotes - post.downvotes}
                        </span>
                        <button onClick={() => votePost(post.id, -1)} className="text-slate-500 hover:text-red-400 transition-colors flex items-center gap-1">
                            <ArrowDown className="w-3.5 h-3.5" />
                        </button>

                        {post.link_url && (
                            <a href={post.link_url.startsWith('http') ? post.link_url : `https://${post.link_url}`} target="_blank" rel="noopener noreferrer" className="ml-auto text-slate-500 hover:text-blue-400">
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function PulseBentoFeed({ posts }: { posts: any[] }) {
    if (!posts || posts.length === 0) {
        return <div className="text-center text-slate-500 text-sm mt-10">No signals detected.</div>
    }
    return (
        <div className="flex flex-col gap-3">
            {posts.map(post => <PulseCompactCard key={post.id} post={post} />)}
        </div>
    )
}
