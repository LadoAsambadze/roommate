import PhoneInput from '@/src/components/shared/phoneInput/PhoneInput'
import { ArrowLeft, AuthSmsIcon, Call, GoogleIcon } from '@/src/components/svgs'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
type SignupLandlordsProps = {
    signupChoosTypeHandler: () => void
}

export default function SignupLandlords({ signupChoosTypeHandler }: SignupLandlordsProps) {
    const [signupMethod, setSignupMethod] = useState<string | null>(null)
    const { t } = useTranslation()
    return (
        <>
            {!signupMethod ? (
                <div className="flex flex-col gap-4">
                    <button
                        className="flex cursor-pointer flex-row items-center gap-1 outline-none"
                        onClick={signupChoosTypeHandler}
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span className="mb-1 text-xs text-[#838CAC]">{t('back')}</span>
                    </button>
                    <h1 className="text-center text-xl  text-textColor">
                        რეგისტრაცია ლენდლორდებისთვის
                    </h1>
                    <button
                        onClick={() => setSignupMethod('google')}
                        className="flex h-10 flex-row items-center justify-center gap-4 rounded-lg border border-[#838CAC] outline-none hover:border-hoverGreen"
                    >
                        <GoogleIcon className="h-6 w-6" />
                        <span>Continue with Google</span>
                    </button>
                    <button className="flex h-10 flex-row items-center justify-center gap-4 rounded-lg border border-[#838CAC] outline-none hover:border-hoverGreen">
                        <AuthSmsIcon className="h-6 w-6" />
                        <span>Continue with Email</span>
                    </button>
                    <button className=" flex h-10 flex-row items-center justify-center gap-4 rounded-lg border border-[#838CAC] outline-none hover:border-hoverGreen">
                        <Call className="h-6 w-6" />
                        <span>Continue with Google</span>
                    </button>
                </div>
            ) : signupMethod === 'google' || 'email' || 'password' ? (
                <form className="grid w-full grid-cols-1 gap-y-4">
                    <h1 className="text-center text-base">რეგისტრაცია</h1>
                    <div className="flex flex-col items-start gap-2">
                        <Label className="text-sm">სახელი</Label>
                        <Input placeholder={'სახელი'} />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <Label className="text-sm">გვარი</Label>
                        <Input placeholder={'გვარი'} />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <Label className="text-sm">ელ ფოსტან</Label>
                        <Input placeholder={'ელ ფოსტა'} />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <Label className="text-sm">სახელი</Label>
                        <PhoneInput
                            type="number"
                            defaultCountry="GE"
                            international
                            value={undefined}
                            field={undefined}
                            labels={undefined}
                            form={undefined}
                        />
                    </div>
                    <Button type="submit" className="mt-3 w-full">
                        რეგისტრაცია
                    </Button>
                    <button
                        className="flex cursor-pointer flex-row items-center gap-1 outline-none"
                        onClick={() => setSignupMethod(null)}
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span className="mb-1 text-xs text-[#838CAC]">{t('back')}</span>
                    </button>
                </form>
            ) : null}
        </>
    )
}
