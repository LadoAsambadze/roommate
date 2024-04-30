'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import type { FormEventHandler } from 'react'

export default function SignUpForm() {
    const router = useRouter()

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const res = await signIn('signup', {
            accessToken: formData.get('accessToken'),
        })

        if (res && !res.error) {
            router.push('/roommates')
        } else {
            console.log(res)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <input type="text" name="accessToken" required />

            <button type="submit">Sign In</button>
        </form>
    )
}
