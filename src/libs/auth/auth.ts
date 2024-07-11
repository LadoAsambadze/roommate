import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            id: 'credentials',
            credentials: {
                phone: {
                    label: 'phone',
                    type: 'text',
                    placeholder: 'phone number',
                    required: true,
                },
                password: {
                    label: 'Password',
                    type: 'text',
                    placeholder: '••••••••',
                    required: true,
                },
            },
            async authorize(credentials) {
                const { phone, password } = credentials
                const response = await fetch(`${process.env.REST_API}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        phone: phone,
                        password: password,
                    }),
                })
                if (response.ok) {
                    const data = await response.json()

                    return {
                        accessToken: data.access_token,
                        id: 'test-id',
                        name: 'test-name',
                        email: 'test-email',
                    }
                } else {
                    throw new Error('Failed to log in')
                }
            },
        }),

        CredentialsProvider({
            id: 'signup',
            credentials: {
                accessToken: {
                    label: 'phone',
                    type: 'text',
                    required: true,
                },
            },
            async authorize(credentials) {
                const { accessToken } = credentials
                if (accessToken) {
                    return {
                        accessToken: accessToken,
                        id: 'test-id',
                        name: 'test-name',
                        email: 'test-email',
                    }
                } else {
                    throw new Error('Failed to log in')
                }
            },
        }),
    ],
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.accessToken = user.accessToken
            }

            return token
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session({ session, token }: { session: any; token: any }) {
            session.accessToken = token.accessToken

            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
})
