'use client'

import { useState, useRef, useEffect } from 'react'
import NewsCard from './NewsCard'

export default function InshortsFeed({ posts }: { posts: any[] }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    // Handle intersection observer to update the progress bar index based on which card is in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'))
                        setCurrentIndex(index)
                    }
                })
            },
            {
                root: containerRef.current,
                threshold: 0.6, // Trigger when 60% of the card is visible
            }
        )

        const elements = document.querySelectorAll('.snap-card')
        elements.forEach((el) => observer.observe(el))

        return () => {
            elements.forEach((el) => observer.unobserve(el))
        }
    }, [posts])

    if (!posts || posts.length === 0) {
        return (
            <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-950 text-slate-400">
                No geopolitical signals detected.
            </div>
        )
    }

    return (
        <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-slate-950">
            {/* Top Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-800 z-50">
                <div
                    className="h-full bg-blue-500 transition-all duration-300 ease-out"
                    style={{ width: `${((currentIndex + 1) / posts.length) * 100}%` }}
                />
            </div>

            {/* Deck Counter */}
            <div className="absolute top-4 right-4 z-50 bg-slate-900/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-300 border border-slate-700/50">
                {currentIndex + 1} / {posts.length}
            </div>

            {/* Scroll Container */}
            <div
                ref={containerRef}
                className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {posts.map((post, index) => (
                    <div
                        key={post.id}
                        className="snap-card snap-start h-full w-full"
                        data-index={index}
                    >
                        <NewsCard post={post} />
                    </div>
                ))}
            </div>

            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    )
}
