import { SignInMutation } from '@/graphql/mutation'
import { setAccessToken, setRefreshToken, setSessionId } from '@/src/auth/authHelpers'
import { ArrowLeft } from '@/src/components/svgs'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

type SigninRoommatesProps = {
    signinChoosTypeHandler: () => void
    roommatesResetPasswordHandler: () => void
}

export default function SigninRoommates({
    signinChoosTypeHandler,
    roommatesResetPasswordHandler,
}: SigninRoommatesProps) {
    const { t } = useTranslation()
    const router = useRouter()

    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const [login] = useMutation(SignInMutation)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setError('')

        try {
            const { data } = await login({ variables: { input: { identifier, password } } })
            if (data?.signIn) {
                setAccessToken(data.signIn.accessToken)
                setRefreshToken(data.signIn.refreshToken)
                setSessionId(data.signIn.sessionId)
                router.push('/roommates')
            }
        } catch (err) {
            setError(t('signInError'))
        }
    }
    return (
        <div className="flex h-full w-full flex-col gap-4">
            <button className="flex flex-row items-center gap-1" onClick={signinChoosTypeHandler}>
                <ArrowLeft className="h-5 w-5" />
                <span className="mb-1 text-xs text-[#838CAC]">{t('back')}</span>
            </button>

            <div className=" text-center text-xl">ავტორიზაცია რუმმეითებისთვის</div>
            <div className="h-[1px] w-full bg-slate-200"></div>
            <form className="grid w-full grid-cols-1 gap-y-4" onSubmit={handleSubmit}>
                <div className="flex flex-col items-start gap-2">
                    <Label className="text-sm">ტელეფონი</Label>
                    <Input
                        placeholder={'ტელეფონი'}
                        onChange={(e) => setIdentifier(e.target.value)}
                    />
                </div>
                <div className="flex flex-col items-start gap-2">
                    <Label className="text-sm">პაროლი</Label>
                    <Input
                        type="password"
                        placeholder={'პაროლი'}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="text-sm text-[red]">{error}</p>}
                <div className="flex w-full flex-row items-center justify-end">
                    <button
                        type="button"
                        onClick={roommatesResetPasswordHandler}
                        className="w-auto text-xs text-[#838CAC]"
                    >
                        {t('forgotPass')}
                    </button>
                </div>
                <Button type="submit" className="w-full">
                    {t('signIn')}
                </Button>
            </form>
        </div>
    )
}
