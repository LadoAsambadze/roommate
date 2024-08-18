import { Button } from '@/src/components/ui/button'

type SigninChooseTypeProps = {
    signinRoommatesHandler: () => void
    signinLandlordsHandler: () => void
}

export default function SigninChooseType({
    signinRoommatesHandler,
    signinLandlordsHandler,
}: SigninChooseTypeProps) {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-5">
            <Button variant="modalButton" className="h-10 w-full" onClick={signinRoommatesHandler}>
                ავტორიზაცია როგორც რუმმეითი
            </Button>
            <Button variant="modalButton" className="h-10 w-full" onClick={signinLandlordsHandler}>
                ავტორიზაცია როგორც ლენდლორდი
            </Button>
        </div>
    )
}
