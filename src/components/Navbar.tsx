import Link from 'next/link';
import AuthButton from '@/components/AuthButton';

export default function Navbar() {
    return (
        <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <span className="text-white text-xl font-bold tracking-tight">GeoInsight: Aletheia</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <div className="flex items-baseline space-x-4">
                            <Link
                                href="/pulse"
                                className="text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                The Community
                            </Link>
                            <Link
                                href="/core"
                                className="text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Analysis
                            </Link>
                            <Link
                                href="/insight"
                                className="text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Financial Insights
                            </Link>
                        </div>
                        <div className="pl-6 border-l border-slate-700">
                            <AuthButton />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
