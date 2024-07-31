'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Dialog, DialogContent } from '@/src/components/ui/dialog'

const SigninModal = () => {
    const router = useRouter()
    return (
        <Dialog open={true} onOpenChange={() => router.back()}>
            <DialogContent className="border-0 bg-transparent text-transparent lg:w-[700px] ">
                <Card className="bg-light-gray-800 dark:bg-dark-gray-800 border-light-gray-700 dark:border-dark-gray-700 border lg:w-[550px]">
                    <CardHeader className="text-2xl">
                        <CardTitle className="text-4xl">Add A Quote</CardTitle>
                        <CardDescription className="text-xl">
                            Add a quote to our list of quotes with one click.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>HELOOOOOOOOOOO</CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    )
}

export default SigninModal
