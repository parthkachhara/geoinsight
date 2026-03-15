import { createPost } from '@/app/pulse/actions'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function CreatePostPage() {
    const cookieStore = await cookies()
    const mockEmail = cookieStore.get('mock_user_email')?.value

    if (!mockEmail) {
        redirect('/login')
    }

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-8 text-slate-100">Create New Analysis</h1>

            <form action={createPost} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="E.g., Economic impact of the new trade tariffs"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Content</label>
                    <textarea
                        name="content"
                        required
                        rows={6}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Provide your analysis or context here..."
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Source Link (Optional)</label>
                    <input
                        type="url"
                        name="link_url"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://news.example.com/article"
                    />
                </div>

                <div className="pt-4 flex justify-end gap-4">
                    <a href="/pulse" className="px-6 py-3 text-slate-400 hover:text-slate-200 transition-colors font-medium">Cancel</a>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors font-semibold">
                        Publish Analysis
                    </button>
                </div>
            </form>
        </div>
    )
}
