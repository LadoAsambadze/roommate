import { ArrowLeft, GoogleIcon } from '@/src/components/svgs'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'

type SigninLandlordsProps = {
    landlordsResetPasswordHandler: () => void
    signinChoosTypeHandler: () => void
}

export default function SigninLandlords({
    landlordsResetPasswordHandler,
    signinChoosTypeHandler,
}: SigninLandlordsProps) {
    return (
        <div className="flex w-full flex-col gap-4">
            <button className="flex flex-row items-center gap-1" onClick={signinChoosTypeHandler}>
                <ArrowLeft className="h-5 w-5" />
                <span className="mb-1 text-xs text-[#838CAC]">უკან</span>
            </button>
            <h1 className="text-center text-xl  text-textColor">ავტორიზაცია</h1>
            <button className="flex h-10 flex-row items-center justify-center gap-4 rounded-lg border border-[#838CAC] outline-none hover:border-hoverGreen">
                <GoogleIcon className="h-6 w-6" />
                <span>გუგლით ავტორიზაცია</span>
            </button>
            <form className="grid w-full grid-cols-1 gap-y-4">
                <div className="flex flex-col items-start gap-2">
                    <Label className="text-sm">ტელეფონი / მეილი</Label>
                    <Input placeholder={`ტელეფონი / მეილი`} />
                </div>
                <div className="flex flex-col items-start gap-2">
                    <Label className="text-sm">პაროლი</Label>
                    <Input placeholder={'პაროლი'} />
                </div>

                <div className="flex w-full flex-row items-center justify-end">
                    <button
                        type="button"
                        onClick={landlordsResetPasswordHandler}
                        className="w-auto text-xs text-[#838CAC]"
                    >
                        დაგავიწყდა პაროლი ?
                    </button>
                </div>
                <Button type="submit" className="w-full">
                    შესვლა
                </Button>
            </form>
        </div>
    )
}
