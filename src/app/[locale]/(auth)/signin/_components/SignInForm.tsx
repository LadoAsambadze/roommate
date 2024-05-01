'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import type { FormEventHandler } from 'react'
import { Input } from '@/src/components/ui/input'

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
            router.push('/')
        } else {
            console.log(res)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-row items-center justify-center">
            <div className="flex min-h-screen w-1/3  flex-col items-center justify-center gap-6 ">
                <Input type="text" name="phone" required />
                <Input type="password" name="password" required />
                <button type="submit">Sign In</button>
            </div>
        </form>
    )
}

export { SignInForm }
