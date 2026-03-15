import { db } from '@/lib/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import Link from 'next/link'
import { Suspense } from 'react'
import CoreDashboardClient from '@/app/core/CoreDashboardClient'
import InsightClient from '@/app/insight/InsightClient'
import PulseBentoFeed from '@/app/pulse/PulseBentoFeed'
import TerminalNav from '@/app/TerminalNav'
import { Globe, Activity, ShieldAlert, BarChart3, Database } from 'lucide-react'
import UserProfileWidget from './UserProfileWidget'

export const revalidate = 0;

export default async function DashboardPage() {
  let posts: any[] = [];
  try {
    const q = query(collection(db, 'posts'), orderBy('created_at', 'desc'));
    const querySnapshot = await getDocs(q);
    posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error fetching posts:", e);
  }

  return (
    <main className="h-screen w-full bg-[#020617] text-slate-50 overflow-hidden font-sans flex flex-col p-4 md:p-6 relative">
      <UserProfileWidget />

      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-[1800px] mx-auto">

        {/* Column 1: Navigation & Live Risk (col-span-2) */}
        <div className="hidden md:flex md:col-span-2 flex-col gap-6 h-full">
          {/* Brand */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center border border-cyan-500/30">
              <Globe className="w-5 h-5 text-cyan-400" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">Aletheia</h1>
          </div>

          {/* Client Navigation */}
          <TerminalNav />

          {/* Live Risk Meter Mock */}
          <Link href="/threat" className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-end shrink-0 hover:bg-slate-800/60 transition-colors cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">Global Threat Level</h3>
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-[family-name:var(--font-geist-mono)] font-bold text-emerald-400 mb-2">LOW</div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2 overflow-hidden">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '20%' }}></div>
            </div>
            <p className="text-xs text-slate-500 font-medium">Click for active intelligence report.</p>
          </Link>
        </div>

        {/* Column 2: Pulse Feed (col-span-4) */}
        <div id="pulse-feed-section" className="md:col-span-4 flex flex-col h-full bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/40">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
              Live Feed
            </h2>
            <span className="text-xs font-[family-name:var(--font-geist-mono)] font-medium text-cyan-500/80 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">{posts.length} Nodes</span>
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 custom-scrollbar">
            <Suspense fallback={<div className="p-4 text-center text-slate-500 text-sm">Loading feed sequence...</div>}>
              <PulseBentoFeed posts={posts} />
            </Suspense>
          </div>
        </div>

        {/* Column 3: Active Intelligence (col-span-6) */}
        <div className="md:col-span-6 flex flex-col gap-6 h-full overflow-y-auto custom-scrollbar pr-2 scroll-smooth">
          <div className="w-full shrink-0" id="intelligence-section">
            <CoreDashboardClient />
          </div>
          <div className="w-full shrink-0" id="economics-section">
            <InsightClient />
          </div>
        </div>

      </div>

      {/* Global CSS for custom scrollbar hidden internally */}
      <style dangerouslySetInnerHTML={{
        __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #1e293b;
                    border-radius: 10px;
                }
            `}} />
    </main>
  )
}
