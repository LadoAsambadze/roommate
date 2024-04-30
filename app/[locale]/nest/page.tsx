import SignUpForm from '@/components/auth/SignUpForm'
import { auth } from '@/libs/next-auth/auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
    const session = await auth()

    if (!session) {
        // Redirect to "/" using custom redirectTo function
        return redirect('/') // Call the redirectTo function
    }
    return (
        <div>
            <button>123123123</button>
            <SignUpForm />
        </div>
    )
}
