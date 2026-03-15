'use client'

import { useState } from 'react'
import { getInsightSectors } from './actions'
import { ShieldCheck, AlertTriangle, Loader2, Lightbulb, TrendingUp, Search, Crosshair, Map, Activity } from "lucide-react"

type SectorData = {
    safeHaven: Array<{ name: string, risk: string }>,
    highRisk: Array<{ name: string, risk: string }>,
    advice: Array<string>
}

export default function InsightClient() {
    const [location, setLocation] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<SectorData | null>(null)
    const [error, setError] = useState('')

    const handleAnalyze = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const res = await getInsightSectors(location)
            if (res.error) {
                setError(`Analysis failed: ${res.error}`);
            } else if (res.data) {
                setResult({
                    safeHaven: Array.isArray(res.data.safeHaven) ? res.data.safeHaven : [],
                    highRisk: Array.isArray(res.data.highRisk) ? res.data.highRisk : [],
                    advice: Array.isArray(res.data.advice) ? res.data.advice : []
                })
            }
        } catch (err) {
            setError('An unexpected error occurred.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={`w-full flex-1 flex flex-col transition-all duration-700 rounded-3xl ${result && !error ? 'shadow-[0_0_20px_rgba(34,211,238,0.15)] ring-1 ring-cyan-500/30' : ''}`}>
            {/* Header Area */}
            <div className="relative mb-6 flex flex-col items-center text-center px-4 pt-6">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-32 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="inline-flex p-2 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-xl border border-slate-700/50 mb-3 shadow-lg shadow-cyan-900/10">
                        <TrendingUp className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 tracking-tight">
                        Capital Flows
                    </h1>
                    <p className="text-slate-400 mt-3 max-w-lg mx-auto font-medium">
                        AI-generated market sentiment and risk management strategies based on the current global landscape.
                    </p>
                </div>
            </div>

            <form onSubmit={handleAnalyze} className="relative z-10 bg-slate-900/40 border border-slate-800/50 rounded-3xl p-5 mb-6 shadow-2xl backdrop-blur-md flex flex-col xl:flex-row items-center justify-between gap-4 mx-4">
                <div className="w-full xl:w-auto text-left">
                    <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                        Global Pulse Analysis
                    </h2>
                    <p className="text-slate-400 text-sm mt-1 max-w-sm">
                        Synthesize recent community intelligence into actionable market strategy.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1 justify-end">
                    <div className="relative w-full sm:w-80">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Crosshair className="h-5 w-5 text-cyan-500/50" />
                        </div>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Target Region (Optional)"
                            className="w-full bg-slate-950/80 border border-slate-700/60 rounded-xl pl-10 pr-3 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-medium text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white px-5 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 shrink-0 group text-sm ${loading ? 'animate-pulse' : ''}`}
                    >
                        {loading ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> Synthesizing...</>
                        ) : (
                            <>
                                <Activity className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                                <span>Generate Outlook</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
            {error && <p className="text-red-400 text-center mb-8 text-sm font-medium bg-red-500/10 py-2 rounded-lg border border-red-500/20 max-w-2xl mx-auto">{error}</p>}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6 relative z-10 px-4">
                {/* Safe Havens Card */}
                <div className="group bg-slate-900/40 border border-slate-800/50 hover:border-emerald-500/30 rounded-3xl p-5 backdrop-blur-md transition-colors duration-300 relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-100 tracking-tight">Safe Havens</h2>
                        </div>
                    </div>

                    <div className="space-y-3 relative z-10 flex-1 flex flex-col justify-center">
                        {!result ? (
                            <div className="p-6 rounded-2xl bg-slate-950/40 border border-slate-800 border-dashed flex flex-col items-center justify-center text-center h-full">
                                <ShieldCheck className="w-10 h-10 text-slate-700 mb-2" />
                                <span className="text-slate-500 font-medium">Awaiting analysis sequence to locate secure capital harbors.</span>
                            </div>
                        ) : result.safeHaven.length === 0 ? (
                            <div className="p-6 rounded-2xl bg-slate-950/40 border border-slate-800 text-center h-full flex items-center justify-center">
                                <p className="text-slate-500 font-medium">No distinct safe havens identified in current dataset.</p>
                            </div>
                        ) : (
                            result.safeHaven.map((sector, i) => (
                                <div key={i} className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/50 flex justify-between items-center group/item hover:bg-slate-950/60 hover:border-emerald-500/30 transition-colors">
                                    <span className="font-bold text-slate-200">{sector.name}</span>
                                    <span className="text-xs font-black tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-md">
                                        {sector.risk}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* High Risk Card */}
                <div className="group bg-slate-900/40 border border-slate-800/50 hover:border-red-500/30 rounded-3xl p-5 backdrop-blur-md transition-colors duration-300 relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-500/10 rounded-xl text-red-400 border border-red-500/20">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-100 tracking-tight">Risk Vectors</h2>
                        </div>
                    </div>

                    <div className="space-y-3 relative z-10 flex-1 flex flex-col justify-center">
                        {!result ? (
                            <div className="p-6 rounded-2xl bg-slate-950/40 border border-slate-800 border-dashed flex flex-col items-center justify-center text-center h-full">
                                <AlertTriangle className="w-10 h-10 text-slate-700 mb-2" />
                                <span className="text-slate-500 font-medium">Awaiting analysis sequence to isolate market vulnerabilities.</span>
                            </div>
                        ) : result.highRisk.length === 0 ? (
                            <div className="p-6 rounded-2xl bg-slate-950/40 border border-slate-800 text-center h-full flex items-center justify-center">
                                <p className="text-slate-500 font-medium">No primary risk vectors identified in current dataset.</p>
                            </div>
                        ) : (
                            result.highRisk.map((sector, i) => (
                                <div key={i} className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/50 flex justify-between items-center group/item hover:bg-slate-950/60 hover:border-red-500/30 transition-colors">
                                    <span className="font-bold text-slate-200">{sector.name}</span>
                                    <span className="text-xs font-black tracking-widest uppercase text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-md">
                                        {sector.risk}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Strategic Directive Section */}
            <div className={`bg-slate-900/40 border border-slate-800/50 rounded-3xl p-5 relative overflow-hidden backdrop-blur-md transition-shadow duration-500 group mx-4 mb-4 ${result ? 'shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'shadow-xl'}`}>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-cyan-600/10 transition-colors duration-700"></div>

                <div className="flex items-center gap-4 mb-6 relative z-10 border-b border-slate-800/60 pb-5">
                    <div className="p-2.5 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-xl text-cyan-400 border border-cyan-500/30 shadow-inner">
                        <Lightbulb className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-extrabold text-slate-100 tracking-tight">Strategic Directive</h2>
                        {result && (
                            <span className="text-sm font-bold tracking-wide uppercase text-cyan-400 mt-1 block">
                                AI Investment Strategy Generated
                            </span>
                        )}
                    </div>
                </div>

                <div className="relative z-10">
                    {!result ? (
                        <div className="h-40 flex items-center justify-center rounded-2xl bg-slate-950/40 border border-slate-800/50 border-dashed">
                            <span className="text-slate-500 italic font-medium">Synthesizing macro indicators...</span>
                        </div>
                    ) : result.advice && result.advice.length === 0 ? (
                        <div className="p-6 rounded-2xl bg-slate-950/40 border border-slate-800 text-center">
                            <p className="text-slate-500 font-medium">Insufficient data points to formulate a strong macro strategy.</p>
                        </div>
                    ) : (
                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {result.advice?.map((point, i) => (
                                <li key={i} className="flex flex-col gap-3 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/60 hover:border-cyan-500/40 transition-colors shadow-sm">
                                    <div className="text-cyan-500 font-black text-xs uppercase tracking-widest mb-1 flex items-center gap-1.5 opacity-80">
                                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div> Let's review
                                    </div>
                                    <span className="text-slate-300 font-medium leading-relaxed">{point}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}
