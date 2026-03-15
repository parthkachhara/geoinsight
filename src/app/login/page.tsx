'use client'

import { useState } from 'react'
import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Globe, ArrowRight, Loader2 } from 'lucide-react'

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password)
            } else {
                await createUserWithEmailAndPassword(auth, email, password)
            }
            router.push('/dashboard')
        } catch (err: any) {
            setError(err.message || 'Authentication failed. Please check your credentials.')
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen w-full bg-[#020617] text-slate-50 font-sans flex items-center justify-center p-4">
            {/* Glowing Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">

                <Link href="/" className="flex items-center gap-3 mb-10 group w-max">
                    <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                        <Globe className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">Aletheia</span>
                </Link>

                <h2 className="text-3xl font-black mb-2 text-white">
                    {isLogin ? 'Access Terminal' : 'Initialize Agent'}
                </h2>
                <p className="text-sm font-medium text-slate-400 mb-8">
                    {isLogin ? 'Enter your credentials to connect to the global feed.' : 'Create a secure profile to access the intelligence grid.'}
                </p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-6 font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Network Alias (Email)</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-950/50 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-[family-name:var(--font-geist-mono)]"
                            placeholder="agent@domain.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Encryption Key (Password)</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-950/50 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-[family-name:var(--font-geist-mono)]"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-white text-slate-900 font-bold px-4 py-3 rounded-xl mt-8 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            <>
                                {isLogin ? 'Establish Connection' : 'Generate Identity'}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-800 text-center flex flex-col gap-4">
                    <button
                        onClick={() => { setIsLogin(!isLogin); setError(''); }}
                        className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                        {isLogin ? "No identity file? Sign up." : "Existing operative? Log in."}
                    </button>

                    <button
                        onClick={() => router.push('/dashboard')}
                        className="text-xs font-medium text-emerald-500 hover:text-emerald-400 transition-colors mt-4 p-2 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/10"
                    >
                        [DEV] Bypass Firebase Authentication
                    </button>
                </div>
            </div>
        </main>
    )
}
