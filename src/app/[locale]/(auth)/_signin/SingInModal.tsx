'use client'

import { SignInMutation } from '@/graphql/mutation'
import { setRefreshToken, setSessionId, setToken } from '@/src/auth/auth'
import { Button } from '@/src/components/ui/button'
import { Dialog, DialogContent } from '@/src/components/ui/dialog'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { useMutation } from '@apollo/client'
import { DialogTitle } from '@radix-ui/react-dialog'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Img from '@images/Img.jpg'
import Image from 'next/image'
import { AlertDialogHeader } from '@/src/components/ui/alert-dialog'

const SigninModal = () => {
    const { t } = useTranslation()

    const [identifier, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [resetPaswword, setResetPassword] = useState(false)
    const [modalStatus, setModalStatus] = useState(false)

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [login] = useMutation(SignInMutation)

    const modalCloseHandler = useCallback(() => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        current.delete('signInModal')
        const search = current.toString()
        const query = search ? `?${search}` : ''
        router.push(`${pathname}${query}`)
    }, [searchParams, router, pathname])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setError('')

        try {
            const { data } = await login({ variables: { input: { identifier, password } } })
            if (data?.signIn) {
                setToken(data.signIn.accessToken)
                setRefreshToken(data.signIn.refreshToken)
                setSessionId(data.signIn.sessionId)
                setModalStatus(false)
                router.push('/roommates')
            }
        } catch (err) {
            setError(t('signInError'))
        }
    }

    useEffect(() => {
        const modal = searchParams.get('signInModal')
        if (modal === 'open') {
            setModalStatus(true)
        } else {
            setModalStatus(false)
        }
    }, [searchParams])

    return (
        <>
            <Dialog open={modalStatus} onOpenChange={modalCloseHandler}>
                <DialogContent className="flex h-[450px] w-auto flex-col gap-0 overflow-hidden bg-[#FFFFFF] p-0 md:max-w-full md:flex-row">
                    <div className="flex w-[460px] flex-col gap-4 gap-y-4 p-12">
                        {!resetPaswword ? (
                            <>
                                <AlertDialogHeader>
                                    <DialogTitle className="pb-4 text-center text-xl">
                                        {t('auth')}
                                    </DialogTitle>
                                    <div className="h-[1px] w-full bg-slate-200"></div>
                                </AlertDialogHeader>
                                <form className="grid grid-cols-1 gap-y-4" onSubmit={handleSubmit}>
                                    <div className="flex flex-col items-start gap-2">
                                        <Label htmlFor="identifier" className="text-sm">
                                            {t('phoneNum')}
                                        </Label>
                                        <Input
                                            value={identifier}
                                            onChange={(e) => setEmail(e.target.value)}
                                            id="identifier"
                                            placeholder={t('phoneNum')}
                                        />
                                    </div>
                                    <div className="flex flex-col items-start gap-2">
                                        <Label htmlFor="password" className="text-sm">
                                            {t('password')}
                                        </Label>
                                        <Input
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            id="password"
                                            type="password"
                                            placeholder={t('password')}
                                        />
                                    </div>

                                    {error && <p className="text-sm text-[red]">{error}</p>}
                                    <button
                                        onClick={() => setResetPassword(true)}
                                        className="text-right text-xs text-[#838CAC]"
                                    >
                                        {t('forgotPass')}
                                    </button>
                                    <Button type="submit" className="w-full">
                                        {t('signIn')}
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <form className="grid grid-cols-1 gap-y-6" onSubmit={handleSubmit}>
                                <span>ArrowLeft</span>
                                <div className="flex flex-col items-start gap-2">
                                    <Label htmlFor="identifier" className="text-sm">
                                        {t('phoneNum')}
                                    </Label>
                                    <Input
                                        value={identifier}
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="identifier"
                                        placeholder={t('phoneNum')}
                                    />
                                </div>
                                {error && <p className="text-sm text-[red]">{error}</p>}

                                <Button type="submit" className="w-full">
                                    {t('getCode')}
                                </Button>
                            </form>
                        )}
                    </div>
                    <div className="w-[460px]">
                        <Image src={Img} alt="Temporray" className="h-full w-full object-cover" />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default SigninModal
