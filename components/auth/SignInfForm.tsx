'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import type { FormEventHandler } from 'react'

const SignInForm = () => {
    const router = useRouter()

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const res = await signIn('credentials', {
            phone: formData.get('phone'),
            password: formData.get('password'),
            redirect: false,
        })

        if (res && !res.error) {
            router.push('/roommates')
        } else {
            console.log(res)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <input type="text" name="phone" required />
            <input type="password" name="password" required />
            <button type="submit">Sign In</button>
        </form>
    )
}

export { SignInForm }
