'use client'

import { useAuth } from '../../../libs/apollo/AuthContext'
import { withAuth } from '@/src/libs/apollo/withAuth'

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
