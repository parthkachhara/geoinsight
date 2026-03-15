import Link from 'next/link'
import { Globe, Activity, BarChart3, LogIn, UserPlus, Database } from 'lucide-react'

export default function LandingPage() {
    return (
        <main className="min-h-screen w-full bg-[#020617] text-slate-50 font-sans selection:bg-cyan-500/30 selection:text-cyan-100 flex flex-col pt-12">

            {/* Top Navigation */}
            <header className="absolute top-0 w-full px-6 py-4 flex items-center justify-between z-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                        <Globe className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">Aletheia</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/login" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        <LogIn className="w-4 h-4" /> Sign In
                    </Link>
                    <Link href="/login" className="flex items-center gap-2 text-sm font-medium bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all hover:scale-105">
                        <UserPlus className="w-4 h-4" /> Subscribe
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <div className="relative flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-20">
                {/* Glowing Background Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-bold tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                        Aletheia GeoInsight Terminal 3.0
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
                        GeoInsight <br className="hidden md:block" />Aletheia
                    </h1>

                    <p className="text-lg md:text-2xl text-slate-400 font-medium mb-12 max-w-2xl leading-relaxed">
                        An immersive intelligence dashboard utilizing autonomous AI agents to map kinetic conflicts, track capital flows, and eliminate bias in real-time.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <Link href="/login" className="group flex items-center gap-3 bg-white hover:bg-slate-200 text-slate-950 font-bold px-8 py-4 rounded-full text-lg transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105">
                            Launch Terminal
                        </Link>
                    </div>
                </div>
            </div>

            {/* Value Proposition Cards */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-32">
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Feature 1 */}
                    <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 border border-slate-800 shadow-2xl hover:bg-slate-800/50 transition-colors group">
                        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Activity className="w-7 h-7 text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-100 mb-3">Live Global Pulse</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            Aggregate real-time geopolitical signals. Aletheia scrubs narrative spin with instantaneous 60-word synthesized briefs and mathematical neutrality scores.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 border border-slate-800 shadow-2xl hover:bg-slate-800/50 transition-colors group">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Database className="w-7 h-7 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-100 mb-3">Core Intelligence</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            Pit any two nations against each other in the analytical engine. Track multi-trillion dollar GDP shifts, defense spending, and live kinetic conflict damages automatically.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 border border-slate-800 shadow-2xl hover:bg-slate-800/50 transition-colors group">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <BarChart3 className="w-7 h-7 text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-100 mb-3">Capital Flows</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            Translating geopolitical shifts into market alpha. Aletheia dynamically predicts safe-haven sectors and flags high-risk investment red zones.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-slate-800/50 py-8 text-center mt-auto bg-slate-950/40">
                <p className="text-sm font-[family-name:var(--font-geist-mono)] text-slate-600">
                    &copy; {new Date().getFullYear()} Aletheia GeoInsight Terminal. Secure connection.
                </p>
            </footer>
        </main>
    )
}
