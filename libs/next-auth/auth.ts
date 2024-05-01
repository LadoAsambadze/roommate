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
                    placeholder: 'youremail@example.com',
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
                const response = await fetch('https://api.roommategeorgia.ge/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        phone: phone, // assuming the phone number is provided in the email field
                        password: password,
                    }),
                })

                console.log(response)

                // Check if the request was successful
                if (response.ok) {
                    const data = await response.json()
                    console.log(data)
                    // Return the token and user info
                    return {
                        token: data.access_token,
                        id: 'test-id', // Replace with actual user ID from API response
                        name: 'test-name', // Replace with actual user name from API response
                        email: 'test-email', // Replace with actual user email from API response
                    }
                } else {
                    // Handle error (you can customize this part)
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
                    placeholder: 'youremail@example.com',
                    required: true,
                },
            },
            async authorize(credentials) {
                const { accessToken } = credentials

                console.log(credentials)

                // Check if the request was successful
                if (accessToken) {
                    return {
                        token: accessToken,
                        id: 'test-id', // Replace with actual user ID from API response
                        name: 'test-name', // Replace with actual user name from API response
                        email: 'test-email', // Replace with actual user email from API response
                    }
                } else {
                    // Handle error (you can customize this part)
                    throw new Error('Failed to log in')
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Add the token to the JWT
                token.accessToken = user.token
            }
            return token
        },
        async session({ session, token }) {
            // Add the token to the session
            session.accessToken = token.accessToken
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET, // Replace with a secure secret
    // ... other NextAuth options (e.g., session, jwt)
  
    events: {
        async signIn({ user }) {
            // Handle successful login events (optional, e.g., analytics)
            console.log('User signed in:', user)
        },
    },
})
