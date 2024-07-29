'use client'

import { withAuth } from '@/src/libs/apollo/withAuth'

function ExamplePage() {
    return (
        <div>
            <h1>Protected Example Page</h1>
            <p>Welcome </p>

            <button>Logout</button>
        </div>
    )
}

export default withAuth(ExamplePage)
