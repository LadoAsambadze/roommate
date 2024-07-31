'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Dialog, DialogContent } from '@/src/components/ui/dialog'

import { useEffect, useState } from 'react'
import LoginForm from '../../signin/page'

const SigninModal = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [modalStatus, setModalStatus] = useState(false)

    useEffect(() => {
        const isSigninPath = /^\/(en|ka)?\/?signin$/.test(pathname)
        setModalStatus(isSigninPath)
    }, [pathname])

    return (
        <Dialog open={modalStatus} onOpenChange={() => router.back()}>
            <DialogContent className="border-0 bg-transparent text-transparent lg:w-[700px] ">
                <Card className="bg-light-gray-800 dark:bg-dark-gray-800 border-light-gray-700 dark:border-dark-gray-700 border lg:w-[550px]">
                    <CardHeader className="text-2xl">
                        <CardTitle className="text-4xl">Add A Quote</CardTitle>
                        <CardDescription className="text-xl">
                            Add a quote to our list of quotes with one click.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoginForm />
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    )
}

export default SigninModal
