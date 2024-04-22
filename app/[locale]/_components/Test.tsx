import React from 'react'

export default async function Test() {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return <div>Testiiiiiiiii</div>
}
