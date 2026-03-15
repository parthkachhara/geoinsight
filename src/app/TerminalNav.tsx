'use client'

import { Activity, BarChart3, Database, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/components/AuthContext'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'

export default function TerminalNav() {
    const { user } = useAuth();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            if (id === 'pulse-scroll-container') {
                element.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            window.location.href = '/';
        } catch (error) {
            console.error('Sign out error', error);
        }
    }

    return (
        <nav className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-4 shadow-xl flex-1 flex flex-col gap-2 min-h-0">
            <div className="flex flex-col mb-4 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/50">
                <div className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-1 flex items-center gap-1.5 animate-pulse">
                    <User className="w-3 h-3" /> Active Operative
                </div>
                <div className="text-sm font-[family-name:var(--font-geist-mono)] text-slate-300 truncate font-bold">
                    {user ? user.email : 'GUEST_MODE'}
                </div>
            </div>

            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest px-4 py-2 mt-2">Terminal</div>
            <Link
                href="/pulse"
                className="flex items-center gap-3 w-full p-4 rounded-xl text-slate-400 font-medium hover:bg-slate-800/50 hover:text-slate-200 transition-colors text-sm"
            >
                <Activity className="w-5 h-5" /> The Community
            </Link>
            <button
                onClick={() => scrollToSection('intelligence-section')}
                className="flex items-center gap-3 w-full p-4 rounded-xl text-slate-400 font-medium hover:bg-slate-800/50 hover:text-slate-200 transition-colors text-sm"
            >
                <Database className="w-5 h-5" /> Analysis
            </button>
            <button
                onClick={() => scrollToSection('economics-section')}
                className="flex items-center gap-3 w-full p-4 rounded-xl text-slate-400 font-medium hover:bg-slate-800/50 hover:text-slate-200 transition-colors text-sm"
            >
                <BarChart3 className="w-5 h-5" /> Financial Insights
            </button>

            <div className="mt-auto pt-4 border-t border-slate-800/50">
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 w-full p-4 rounded-xl text-red-400/70 font-medium hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm"
                >
                    <LogOut className="w-5 h-5" /> Terminate Session
                </button>
            </div>
        </nav>
    )
}
