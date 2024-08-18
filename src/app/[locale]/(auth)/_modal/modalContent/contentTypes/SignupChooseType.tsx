import { Button } from '@/src/components/ui/button'
type SignupChooseTypeProps = {
    signupLandlordsHandler: () => void
    signupRoommatesHandler: () => void
}

export default function SignupChooseType({
    signupLandlordsHandler,
    signupRoommatesHandler,
}: SignupChooseTypeProps) {
    return (
        <div className="flex h-full w-full flex-col  items-center justify-center gap-5  ">
            <Button variant="modalButton" className="h-10 w-full" onClick={signupRoommatesHandler}>
                რეგისტრაცია ფორმა რუმმეითებისთვის
            </Button>
            <Button variant="modalButton" className="h-10 w-full" onClick={signupLandlordsHandler}>
                რეგისტრაცია ფორმა ლენდლორდებისთვის
            </Button>
        </div>
    )
}
