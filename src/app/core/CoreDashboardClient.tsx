'use client'

import { useState } from 'react'
import { getFinancialAnalysis } from './actions'
import { Loader2, DollarSign, TrendingUp, Activity, BarChart3, Building2, Briefcase } from 'lucide-react'

type CoreData = {
    country: string;
    cagr: string;
    investment_sectors: Array<{
        sector: string;
        performance: string;
        top_companies: string[];
    }>;
    indices: string[];
}

export default function CoreDashboardClient() {
    const [countryInput, setCountryInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<CoreData | null>(null)
    const [error, setError] = useState('')

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!countryInput) return

        setLoading(true)
        setError('')

        try {
            const res = await getFinancialAnalysis(countryInput)
            if (res.error) {
                setError(res.error)
            } else if (res.data) {
                setResult(res.data)
            }
        } catch (err) {
            setError('An unexpected error occurred.')
        } finally {
            setLoading(false)
        }
    }

    const isPositive = (val: string) => !val.toString().startsWith('-') && !val.toString().toLowerCase().includes('negative');

    return (
        <div className={`w-full flex-1 flex flex-col transition-all duration-700 rounded-3xl ${result && !error ? 'shadow-[0_0_20px_rgba(34,211,238,0.15)] ring-1 ring-cyan-500/30' : ''}`}>

            {/* Header Area */}
            <div className="relative mb-6 flex flex-col items-center text-center px-4 pt-6">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-cyan-600/20 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="inline-flex p-2 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl border border-slate-700/50 mb-3 shadow-lg shadow-emerald-900/10">
                        <BarChart3 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 tracking-tight">
                        Financial Intelligence
                    </h1>
                    <p className="text-slate-400 mt-3 max-w-lg mx-auto font-medium text-sm">
                        Macroeconomic analysis and strict sector performance modeling.
                    </p>
                </div>
            </div>

            {/* Search Input */}
            <form onSubmit={handleGenerate} className="relative z-10 bg-slate-900/40 border border-slate-800/50 rounded-3xl p-5 mb-8 shadow-2xl backdrop-blur-md mx-4 max-w-3xl mx-auto w-[calc(100%-2rem)]">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Activity className="h-5 w-5 text-emerald-500/50" />
                        </div>
                        <input
                            type="text"
                            value={countryInput}
                            onChange={(e) => setCountryInput(e.target.value)}
                            placeholder="Enter Nation State (e.g., India, USA, Japan)"
                            required
                            className="w-full bg-slate-950/80 border border-slate-700/60 rounded-xl pl-10 pr-3 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all font-semibold text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!countryInput || loading}
                        className={`w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center min-w-[140px] text-sm shrink-0 ${loading ? 'animate-pulse' : ''}`}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Extracting
                            </>
                        ) : (
                            "Generate"
                        )}
                    </button>
                </div>
                {error && <p className="text-rose-400 text-center mt-4 text-xs font-medium bg-rose-500/10 py-2 rounded-lg border border-rose-500/20">{error}</p>}
            </form>

            {/* Dashboard Content */}
            {result && (
                <div className="mx-4 mb-6 relative z-10 flex flex-col gap-6">

                    {/* Header Banner */}
                    <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center backdrop-blur-md shadow-lg relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors"></div>
                        <div className="flex items-center gap-4 relative z-10">
                            <span className="text-slate-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-emerald-400" /> Target Protocol:
                            </span>
                            <span className="text-3xl font-black text-slate-100 tracking-tight">{result.country || countryInput}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-4 md:mt-0 relative z-10 bg-slate-950/50 px-4 py-2 rounded-xl border border-slate-800/50">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-emerald-400" /> Projected CAGR
                            </span>
                            <span className="text-2xl font-black text-emerald-400 font-[family-name:var(--font-geist-mono)]">{result.cagr || "N/A"}</span>
                        </div>
                    </div>

                    <div className="flex flex-col xl:flex-row gap-6">
                        {/* Sector Heatmap */}
                        <div className="bg-slate-900/40 border border-slate-800/50 rounded-3xl p-5 backdrop-blur-md shadow-xl flex-1 focus-within:ring-1 ring-emerald-500/20 transition-all">
                            <h3 className="text-sm font-bold text-slate-200 mb-5 flex items-center gap-2 uppercase tracking-widest">
                                <Briefcase className="w-4 h-4 text-slate-400" /> Investment Sectors
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {result.investment_sectors && result.investment_sectors.map((sector, idx) => {
                                    const positive = isPositive(sector.performance);
                                    return (
                                        <div key={idx} className={`p-4 rounded-2xl border ${positive ? 'bg-emerald-950/20 border-emerald-900/30 hover:border-emerald-500/40' : 'bg-rose-950/20 border-rose-900/30 hover:border-rose-500/40'} transition-colors relative overflow-hidden group`}>
                                            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity ${positive ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>

                                            <div className="flex justify-between items-start mb-3 relative z-10">
                                                <h4 className="font-bold text-slate-100 text-base">{sector.sector}</h4>
                                                <div className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${positive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                                                    {sector.performance}
                                                </div>
                                            </div>

                                            <div className="mb-2 relative z-10">
                                                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">Top Companies</div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {sector.top_companies && sector.top_companies.map((company, cIdx) => (
                                                        <span key={cIdx} className="px-2 py-0.5 bg-slate-950/60 border border-slate-800 rounded-md text-xs text-slate-300">
                                                            {company}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Market Indices Stack */}
                        <div className="w-full xl:w-80 flex flex-col gap-6 shrink-0">
                            <div className="bg-slate-900/40 border border-slate-800/50 rounded-3xl p-5 backdrop-blur-md shadow-xl flex-1">
                                <h3 className="text-sm font-bold text-slate-200 mb-5 flex items-center gap-2 uppercase tracking-widest">
                                    <Activity className="w-4 h-4 text-slate-400" /> Major Indices
                                </h3>
                                <div className="flex flex-col gap-3">
                                    {result.indices && result.indices.map((index, idx) => (
                                        <div key={idx} className="bg-slate-950/50 border border-slate-800/60 p-4 rounded-xl hover:border-slate-700 transition-colors flex items-center justify-between">
                                            <span className="font-bold text-slate-300 text-sm">{index}</span>
                                            <Activity className="w-4 h-4 text-slate-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
