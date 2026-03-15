'use client'

import { useAuth } from '@/components/AuthContext'
import { User, LogOut } from 'lucide-react'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'

export default function UserProfileWidget() {
    const { user } = useAuth()

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            window.location.href = '/';
        } catch (error) {
            console.error('Sign out error', error);
        }
    }

    // Get the first letter of the email, or fallback to a User icon
    const initial = user?.email ? user.email.charAt(0).toUpperCase() : null;

    return (
        <div className="fixed top-6 right-6 lg:right-8 z-50">
            <div
                onClick={handleSignOut}
                className="w-12 h-12 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center text-slate-200 hover:border-red-500/50 hover:bg-red-500/10 transition-all cursor-pointer group shadow-xl"
            >
                {initial ? (
                    <span className="text-xl font-bold font-[family-name:var(--font-geist-mono)] group-hover:text-cyan-400 transition-colors">
                        {initial}
                    </span>
                ) : (
                    <User className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
                )}

                {/* Tooltip for email / Logout */}
                <div className="absolute top-14 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/95 backdrop-blur-md border border-slate-700/50 text-xs font-medium text-slate-300 px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none shadow-xl flex flex-col items-end gap-1">
                    <span className="text-slate-400">{user?.email || 'Guest Session'}</span>
                    <span className="text-red-400 font-bold flex items-center gap-1.5">
                        <LogOut className="w-3 h-3" /> Click to Terminate Session
                    </span>
                </div>
            </div>
        </div>
    )
}
