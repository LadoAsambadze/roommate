// app/example/page.tsx
'use client'

import { gql } from '@apollo/client'
import { useAuth } from '../(auth)/AuthContext'
import { withAuth } from '../(auth)/withAuth'

function ExamplePage() {
    const { logout } = useAuth()

    return (
        <div>
            <h1>Protected Example Page</h1>
            <p>Welcome </p>

            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default withAuth(ExamplePage)
