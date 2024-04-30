'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import type { FormEventHandler } from 'react'
import { Input } from '@/components/ui/input'

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
        <form
            onSubmit={handleSubmit}
            className="flex min-h-screen w-full flex-col items-center justify-center"
        >
            <Input className="w-[400px]" type="text" name="phone" required />
            <Input className="w-[400px]" type="password" name="password" required />
            <button className="w-[400px]" type="submit">
                Sign In
            </button>
        </form>
    )
}

export { SignInForm }
