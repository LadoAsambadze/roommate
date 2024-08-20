import { ArrowLeft } from '@/src/components/svgs'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { useState } from 'react'
import { InputOTPForm } from '../verifyCode/ResetPasswordOTP'

type ResetPasswordProps = {
    signinRoommatesHandler: () => void
    signinLandlordsHandler: () => void
    modalType: string
}

export default function ResetPassword({
    signinRoommatesHandler,
    signinLandlordsHandler,
    modalType,
}: ResetPasswordProps) {
    const [resetPassword, setResetPassword] = useState(false)
    const [newPassword, setNewPassword] = useState(false)
    return (
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
                            <span className="mb-1 text-xs text-[#838CAC]">უკან</span>
                        </button>
                    </div>
                    <form className="grid w-full grid-cols-1 gap-y-6">
                        <h1 className="text-center text-base">პაროლის აღდგენა</h1>

                        <div className="flex flex-col items-start gap-2">
                            <Label htmlFor="identifier" className="text-sm">
                                {modalType === 'resetPasswordRoommates'
                                    ? 'ტელეფონი'
                                    : `ტელეფონი / მეილი`}
                            </Label>
                            <Input
                                placeholder={
                                    modalType === 'resetPasswordRoommates'
                                        ? 'ტელეფონი'
                                        : `ტელეფონი / მეილი`
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
                            კოდის გაგზავნა
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
                            <span className="mb-1 text-xs text-[#838CAC]">უკან</span>
                        </button>
                    </div>
                    <InputOTPForm setNewPassword={setNewPassword} />
                </div>
            ) : newPassword ? (
                <div className="flex w-full flex-col items-start gap-6">
                    <div className="flex w-full justify-start">
                        <button
                            className="flex cursor-pointer flex-row  items-center gap-1 outline-none"
                            onClick={() => {
                                setNewPassword(false)
                                setResetPassword(true)
                            }}
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="mb-1 text-xs text-[#838CAC]">უკან</span>
                        </button>
                    </div>
                    <div className="flex w-full justify-center">
                        <h1>პაროლის აღდგენა</h1>
                    </div>
                    <form className="flex w-full flex-col items-start gap-4">
                        <Label htmlFor="newpassword" className="text-sm">
                            ახალი პაროლი
                        </Label>
                        <Input placeholder={'ახალი პაროლი'} />
                        <Label htmlFor="newpassword" className="text-sm">
                            დაადასტურე პაროლი
                        </Label>
                        <Input placeholder={' დაადასტურე პაროლი'} />
                        <Button type="submit" className="w-full">
                            შენახვა
                        </Button>
                    </form>
                </div>
            ) : null}
        </>
    )
}
