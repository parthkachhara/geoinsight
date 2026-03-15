'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { analyzeNeutrality, generateBrief } from '@/lib/gemini'
import { db } from '@/lib/firebase'
import { collection, addDoc, doc, updateDoc, deleteDoc, increment } from 'firebase/firestore'

export async function createPost(formData: FormData) {
    const cookieStore = await cookies()
    const mockEmail = cookieStore.get('mock_user_email')?.value

    if (!mockEmail) {
        redirect('/login')
    }

    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const link_url = formData.get('link_url') as string

    // Since Gemini APIs might also be missing real keys, 
    // we bypass the actual analysis if it fails and provide dummy returns,
    // although the original code had a fallback anyway.
    const { score, tag } = await analyzeNeutrality(title, content)

    await addDoc(collection(db, 'posts'), {
        title,
        content,
        link_url,
        neutrality_score: score,
        neutrality_tag: tag,
        upvotes: 0,
        downvotes: 0,
        created_at: new Date().toISOString(),
        profiles: { username: mockEmail.split('@')[0] },
        authorEmail: mockEmail
    })

    revalidatePath('/pulse')
    redirect('/pulse')
}

export async function votePost(postId: string, voteType: number) {
    const cookieStore = await cookies()
    const mockEmail = cookieStore.get('mock_user_email')?.value

    if (!mockEmail) {
        return { error: 'Not authenticated' }
    }

    const postRef = doc(db, 'posts', postId)
    if (voteType === 1) {
        await updateDoc(postRef, { upvotes: increment(1) })
    } else if (voteType === -1) {
        await updateDoc(postRef, { downvotes: increment(1) })
    }

    revalidatePath('/pulse')
}

export async function deletePost(postId: string) {
    const cookieStore = await cookies()
    const mockEmail = cookieStore.get('mock_user_email')?.value

    if (!mockEmail) {
        return { error: 'Not authenticated' }
    }

    await deleteDoc(doc(db, 'posts', postId))

    revalidatePath('/pulse')
}

export async function getSummarizedPost(content: string) {
    const data = await generateBrief(content);
    return data;
}
