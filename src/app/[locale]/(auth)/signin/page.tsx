'use client'

import { SignInMutation } from '@/graphql/mutation'
import { setRefreshToken, setSessionId, setToken } from '@/src/auth/auth'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SigninModal = () => {
    const [identifier, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const [login] = useMutation(SignInMutation)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setError('')

        try {
            const { data } = await login({ variables: { input: { identifier, password } } })
            if (data?.signIn) {
                setToken(data.signIn.accessToken)
                setRefreshToken(data.signIn.refreshToken)
                setSessionId(data.signIn.sessionId)
                router.push('/roommates')
            }
        } catch (err) {
            setError('Invalid email or password')
        }
    }

    return (
        <>
            <form
                className="flex h-full w-full flex-col items-center justify-center  gap-10 py-20"
                onSubmit={handleSubmit}
            >
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div>
                    <label htmlFor="email">Identifier:</label>
                    <input
                        className="border border-black"
                        id="email"
                        value={identifier}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        className="border border-black"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default SigninModal
