import { cookies } from 'next/headers'
import Link from 'next/link'
import { signout } from '@/app/login/actions'

export default async function AuthButton() {
    const cookieStore = await cookies()
    const mockEmail = cookieStore.get('mock_user_email')?.value

    if (!mockEmail) {
        return (
            <Link
                href="/login"
                className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
                Sign In
            </Link>
        )
    }

    return (
        <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">
                {mockEmail}
            </span>
            <form action={signout}>
                <button className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors border border-slate-700 hover:bg-slate-800">
                    Sign Out
                </button>
            </form>
        </div>
    )
}
