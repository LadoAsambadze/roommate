// app/example/page.tsx
'use client'

import { useQuery, gql } from '@apollo/client'
import { useAuth } from '../(auth)/AuthContext'
import { withAuth } from '../(auth)/withAuth'

const GET_USER_DATA = gql`
    query GetUserData {
        user {
            id
            name
            email
        }
    }
`

function ExamplePage() {
    const { logout } = useAuth()
    const data = {
        user: {
            name: 'lado',
        },
    }

    return (
        <div>
            <h1>Protected Example Page</h1>
            <p>Welcome, {data.user.name}!</p>

            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default withAuth(ExamplePage)
