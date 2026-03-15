import Link from 'next/link'
import { ArrowLeft, ShieldAlert, Activity, AlertTriangle, BarChart3 } from 'lucide-react'

export default function ThreatPage() {
    return (
        <div className="min-h-screen w-full bg-[#020617] text-slate-50 flex items-center justify-center p-6 font-sans">
            <div className="max-w-3xl w-full">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8 text-sm font-medium group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Return to Terminal
                </Link>

                <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 shadow-2xl">
                    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-800">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                            <ShieldAlert className="w-8 h-8 text-emerald-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Global Threat Assessment</h1>
                            <p className="text-slate-400">Real-time macro-geopolitical stability tracking.</p>
                        </div>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 mb-8">
                        <div>
                            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Current Posture</h2>
                            <div className="flex items-baseline gap-3">
                                <span className="text-5xl font-[family-name:var(--font-geist-mono)] font-bold text-emerald-400">LOW</span>
                                <span className="text-sm font-medium text-emerald-500/80 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">STABLE</span>
                            </div>
                            <p className="mt-4 text-slate-300 leading-relaxed text-sm">
                                Based on a synthesis of recent events logged in the Pulse Engine, global kinetic tensions remain at baseline. No immediate nuclear posture elevations or severe economic blockades have been actively triggered in the last 24 hours.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Threat Vectors</h2>

                            <div className="flex items-center justify-between p-4 bg-slate-950/40 rounded-xl border border-slate-800/50">
                                <div className="flex items-center gap-3">
                                    <Activity className="w-4 h-4 text-cyan-400" />
                                    <span className="text-sm font-medium text-slate-300">Kinetic Conflict</span>
                                </div>
                                <span className="text-xs font-[family-name:var(--font-geist-mono)] text-slate-500">LOW</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-950/40 rounded-xl border border-slate-800/50">
                                <div className="flex items-center gap-3">
                                    <BarChart3 className="w-4 h-4 text-yellow-400" />
                                    <span className="text-sm font-medium text-slate-300">Economic Sanctions</span>
                                </div>
                                <span className="text-xs font-[family-name:var(--font-geist-mono)] text-slate-500">ELEVATED</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-950/40 rounded-xl border border-slate-800/50">
                                <div className="flex items-center gap-3">
                                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                                    <span className="text-sm font-medium text-slate-300">Supply Chain Risk</span>
                                </div>
                                <span className="text-xs font-[family-name:var(--font-geist-mono)] text-slate-500">MODERATE</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 text-sm text-cyan-200/70 leading-relaxed italic">
                        The Global Threat Level is automatically calculated by synthesizing metadata tags and AI-generated neutrality scores from the central Pulse feed.
                    </div>
                </div>

            </div>
        </div>
    )
}
