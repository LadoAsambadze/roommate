'use client'

import { Button } from '@/src/components/ui/button'
import { ToastAction } from '@/src/components/ui/toast'
import { useToast } from '@/src/components/ui/use-toast'

export function InfoToast() {
    const { toast } = useToast()

    return (
        <Button
            variant="outline"
            onClick={() => {
                toast({
                    variant: 'destructive',
                    title: 'Uh oh! Something went wrong.',
                    description: 'There was a problem with your request.',
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            }}
        >
            Show Toast
        </Button>
    )
}
