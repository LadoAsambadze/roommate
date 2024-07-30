'use client'

import { CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Dialog, DialogContent } from '@/src/components/ui/dialog'
import { useRouter } from 'next/navigation'

const AddQuoteModal = () => {
    const router = useRouter()
    return (
        <Dialog open={true} onOpenChange={() => router.back()}>
            <DialogContent className="border-0 bg-transparent text-transparent lg:w-[700px] ">
                <CardContent className="  border     bg-white lg:w-[550px]">
                    <CardHeader className="text-2xl">
                        <CardTitle className="text-4xl">Add A Quote</CardTitle>
                        <CardDescription className="text-xl">
                            Add a quote to our list of quotes with one click.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-black">Login Form</CardContent>
                </CardContent>
            </DialogContent>
        </Dialog>
    )
}

export default AddQuoteModal
