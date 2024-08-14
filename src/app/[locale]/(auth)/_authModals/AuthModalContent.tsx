'use client'

import { SignInMutation } from '@/graphql/mutation'
import { setRefreshToken, setSessionId, setToken } from '@/src/auth/auth'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { useMutation } from '@apollo/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, AuthSmsIcon, Call, GoogleIcon } from '@/src/components/svgs'
import { useModalHandlers } from './ModalHandlers'
import Img from '@images/Img.jpg'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'
import { InputOTPForm } from './ResetPasswordOTP'

export const AuthModalContent = () => {
    const { t } = useTranslation()

    const [identifier, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [resetPassword, setResetPassword] = useState(false)
    const [newPassword, setNewPassword] = useState(false)
    const [modalType, setModalType] = useState('')

    const router = useRouter()
    const searchParams = useSearchParams()

    const [login] = useMutation(SignInMutation)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setError('')

        try {
            const { data } = await login({ variables: { input: { identifier, password } } })
            if (data?.signIn) {
                setToken(data.signIn.accessToken)
                setRefreshToken(data.signIn.refreshToken)
                setSessionId(data.signIn.sessionId)
                router.push('/roommates')
            }
        } catch (err) {
            setError(t('signInError'))
        }
    }

    useEffect(() => {
        const modal = searchParams.get('modal')
        if (modal === 'signinChooseType') {
            setModalType('signinChooseType')
        } else if (modal === 'signinRoommates') {
            setModalType('signinRoommates')
        } else if (modal === 'signinLandlords') {
            setModalType('signinLandlords')
        } else if (modal === 'signupChooseType') {
            setModalType('signupChooseType')
        } else if (modal === 'signupLandlords') {
            setModalType('signupLandlords')
        } else if (modal === 'resetPasswordRoommates') {
            setModalType('resetPasswordRoommates')
        } else if (modal === 'resetPasswordLandlords') {
            setModalType('resetPasswordLandlords')
        }
    }, [searchParams])

    const isMobile = useMediaQuery({
        query: ' (max-width: 768px)',
    })

    const {
        signinRoommatesHandler,
        signinLandlordsHandler,
        signupRoommatesHandler,
        signupLandlordsHandler,
        signupChoosTypeHandler,
        signinChoosTypeHandler,
        landlordsResetPasswordHandler,
        roommatesResetPasswordHandler,
    } = useModalHandlers()

    return (
        <>
            <div className="flex h-full w-full  flex-col items-center    gap-4 gap-y-4 p-6 md:w-[460px] md:p-12">
                {modalType === 'signinChooseType' ? (
                    <div className="flex h-full flex-col items-center justify-center gap-5">
                        <Button
                            variant="modalButton"
                            className="h-10 w-full"
                            onClick={signinRoommatesHandler}
                        >
                            ავტორიზაცია როგორც რუმმეითი
                        </Button>
                        <Button
                            variant="modalButton"
                            className="h-10 w-full"
                            onClick={signinLandlordsHandler}
                        >
                            ავტორიზაცია როგორც ლენდლორდი
                        </Button>
                    </div>
                ) : modalType === 'signupChooseType' ? (
                    <div className="flex h-full w-full flex-col  items-center justify-center gap-5  ">
                        <Button
                            variant="modalButton"
                            className="h-10 w-full"
                            onClick={signupRoommatesHandler}
                        >
                            რეგისტრაცია ფორმა რუმმეითებისთვის
                        </Button>
                        <Button
                            variant="modalButton"
                            className="h-10 w-full"
                            onClick={signupLandlordsHandler}
                        >
                            რეგისტრაცია ფორმა ლენდლორდებისთვის
                        </Button>
                    </div>
                ) : modalType === 'signupLandlords' ? (
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
                        <button className="flex h-10 flex-row items-center justify-center gap-4 rounded-lg border border-[#838CAC] outline-none hover:border-hoverGreen">
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
                ) : modalType === 'signinRoommates' ? (
                    <div className="flex h-full w-full flex-col gap-4">
                        <button
                            className="flex flex-row items-center gap-1"
                            onClick={signinChoosTypeHandler}
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="mb-1 text-xs text-[#838CAC]">{t('back')}</span>
                        </button>

                        <div className=" text-center text-xl">ავტორიზაცია რუმმეითებისთვის</div>
                        <div className="h-[1px] w-full bg-slate-200"></div>
                        <form className="grid w-full grid-cols-1 gap-y-4" onSubmit={handleSubmit}>
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
                ) : modalType === 'signinLandlords' ? (
                    <div className="flex w-full flex-col gap-4">
                        <button
                            className="flex flex-row items-center gap-1"
                            onClick={signinChoosTypeHandler}
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="mb-1 text-xs text-[#838CAC]">{t('back')}</span>
                        </button>
                        <h1 className="text-center text-xl  text-textColor">ავტორიზაცია</h1>
                        <button className="flex h-10 flex-row items-center justify-center gap-4 rounded-lg border border-[#838CAC] outline-none hover:border-hoverGreen">
                            <GoogleIcon className="h-6 w-6" />
                            <span>Continue with Google</span>
                        </button>

                        <form className="grid w-full grid-cols-1 gap-y-4" onSubmit={handleSubmit}>
                            <div className="flex flex-col items-start gap-2">
                                <Label htmlFor="identifier" className="text-sm">
                                    {t('phoneNum')} / {t('email')}
                                </Label>
                                <Input
                                    value={identifier}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="identifier"
                                    placeholder={`${t('phoneNum')} / ${t('email')}`}
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
                            <div className="flex w-full flex-row items-center justify-end">
                                <button
                                    type="button"
                                    onClick={landlordsResetPasswordHandler}
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
                ) : modalType === 'resetPasswordRoommates' ||
                  modalType === 'resetPasswordLandlords' ? (
                    <>
                        {!resetPassword && !newPassword ? (
                            <>
                                <div className="flex w-full justify-start">
                                    <button
                                        className="flex cursor-pointer flex-row items-center gap-1 outline-none"
                                        onClick={
                                            modalType === 'resetPasswordRoommates'
                                                ? signinRoommatesHandler
                                                : signinLandlordsHandler
                                        }
                                    >
                                        <ArrowLeft className="h-5 w-5" />
                                        <span className="mb-1 text-xs text-[#838CAC]">
                                            {t('back')}
                                        </span>
                                    </button>
                                </div>
                                <form className="grid w-full grid-cols-1 gap-y-6">
                                    <h1 className="text-center text-base">{t('resetPassword')}</h1>

                                    <div className="flex flex-col items-start gap-2">
                                        <Label htmlFor="identifier" className="text-sm">
                                            {modalType === 'resetPasswordRoommates'
                                                ? t('phoneNum')
                                                : `${t('phoneNum')} / ${t('email')}`}
                                        </Label>

                                        <Input
                                            value={identifier}
                                            onChange={(e) => setEmail(e.target.value)}
                                            id="identifier"
                                            placeholder={
                                                modalType === 'resetPasswordRoommates'
                                                    ? t('phoneNum')
                                                    : `${t('phoneNum')} / ${t('email')}`
                                            }
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        onClick={() => {
                                            setResetPassword(true)
                                        }}
                                        className="w-full"
                                    >
                                        {t('getCode')}
                                    </Button>
                                </form>
                            </>
                        ) : resetPassword && !newPassword ? (
                            <div className="flex w-full flex-col items-center  gap-6 text-sm">
                                <div className="flex w-full justify-start">
                                    <button
                                        className="flex cursor-pointer flex-row items-center gap-1 outline-none"
                                        onClick={() => setResetPassword(false)}
                                    >
                                        <ArrowLeft className="h-5 w-5" />
                                        <span className="mb-1 text-xs text-[#838CAC]">
                                            {t('back')}
                                        </span>
                                    </button>
                                </div>
                                <InputOTPForm setNewPassword={setNewPassword} />
                            </div>
                        ) : newPassword ? (
                            <div className="flex w-full  flex-col items-start gap-6">
                                <div className="flex w-full justify-start">
                                    <button
                                        className="flex cursor-pointer flex-row  items-center gap-1 outline-none"
                                        onClick={() => {
                                            setNewPassword(false)
                                            setResetPassword(true)
                                        }}
                                    >
                                        <ArrowLeft className="h-5 w-5" />
                                        <span className="mb-1 text-xs text-[#838CAC]">
                                            {t('back')}
                                        </span>
                                    </button>
                                </div>
                                <div className="flex w-full justify-center">
                                    <h1>პაროლის აღდგენა</h1>
                                </div>
                                <form className="flex w-full flex-col items-start gap-4">
                                    <Label htmlFor="newpassword" className="text-sm">
                                        New password
                                    </Label>
                                    <Input
                                        value={identifier}
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="newPassword"
                                        placeholder={t('newPass')}
                                    />
                                    <Label htmlFor="newpassword" className="text-sm">
                                        Confirm Password
                                    </Label>
                                    <Input
                                        value={identifier}
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="ConfirmPassword"
                                        placeholder={t('ConfirmPassword')}
                                    />
                                    <Button type="submit" className="w-full">
                                        შენახვა
                                    </Button>
                                </form>
                            </div>
                        ) : null}
                    </>
                ) : null}
            </div>
            <div className="hidden h-full w-full md:block md:w-[460px]">
                <Image src={Img} alt="Temporray" className="h-full w-full object-cover" />
            </div>
        </>
    )
}
