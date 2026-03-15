'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { cookies } from 'next/headers'

export async function login(formData: FormData) {
    const email = formData.get('email') as string

    if (!email) {
        redirect('/login?error=Email is required')
    }

    // Mock successful login by setting a cookie
    const cookieStore = await cookies()
    cookieStore.set('mock_user_email', email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/'
    })

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const email = formData.get('email') as string

    if (!email) {
        redirect('/login?error=Email is required')
    }

    // Mock successful signup by setting a cookie
    const cookieStore = await cookies()
    cookieStore.set('mock_user_email', email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/'
    })

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signout() {
    const cookieStore = await cookies()
    cookieStore.delete('mock_user_email')

    revalidatePath('/', 'layout')
    redirect('/login')
}
