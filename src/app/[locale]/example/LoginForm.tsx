import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { SignInMutation } from '@/graphql/mutation'
import { removeAllTokens, setRefreshToken, setSessionId, setToken } from '@/src/libs/apollo/auth'
import { signOutHandler } from '@/src/libs/apollo/signOut'

const LoginForm = () => {
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
            setToken(data.signIn.accessToken)
            setRefreshToken(data.signIn.refreshToken)
            setSessionId(data.signIn.sessionId)
            router.push('/roommates')
        } catch (err) {
            setError('Invalid email or password')
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        value={identifier}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <button onClick={signOutHandler}>log out</button>
        </>
    )
}

export default LoginForm
