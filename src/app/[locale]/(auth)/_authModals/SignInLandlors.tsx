'use client'

import { Dialog, DialogContent } from '@/src/components/ui/dialog'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import Img from '@images/Img.jpg'
import Image from 'next/image'

export const SignInLandlords = () => {
    const [modalStatus, setModalStatus] = useState(false)
    const [modalType, setModalType] = useState(false)

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const modalCloseHandler = useCallback(() => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        current.delete('signInModal')
        current.delete('signUpModal')
        const search = current.toString()
        const query = search ? `?${search}` : ''
        router.push(`${pathname}${query}`)
    }, [searchParams, router, pathname])

    const handleSignupClick = useCallback(() => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        current.delete('signInModal')
        current.set('signUpModal', 'Landlords')
        const search = current.toString()
        const query = search ? `?${search}` : ''
        router.push(`${pathname}${query}`)
    }, [searchParams, router, pathname])

    const handleSigninClick = useCallback(() => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        current.delete('signUpModal')
        current.set('signInModal', 'Landlords')
        const search = current.toString()
        const query = search ? `?${search}` : ''
        router.push(`${pathname}${query}`)
    }, [searchParams, router, pathname])

    useEffect(() => {
        const signInModal = searchParams.get('signInModal')
        const signUpModal = searchParams.get('signUpModal')
        if (signInModal === 'Landlords' || signUpModal === 'Landlords') {
            setModalStatus(true)
        } else {
            setModalStatus(false)
        }
    }, [searchParams])

    useEffect(() => {
        const modalStatus = new URLSearchParams(Array.from(searchParams.entries()))
        const signInModal = modalStatus.get('signInModal')
        const signUpModal = modalStatus.get('signUpModal')

        if (signInModal === 'Landlords') {
            setModalType(true)
        } else if (signUpModal === 'Landlords') {
            setModalType(false)
        }
    }, [searchParams])

    return (
        <>
            <Dialog open={modalStatus} onOpenChange={modalCloseHandler}>
                <DialogContent className="flex h-[450px] w-full max-w-full flex-col gap-0 overflow-hidden bg-[#FFFFFF] p-0 md:w-auto md:max-w-full md:flex-row">
                    <div className="flex w-full  flex-col gap-4 gap-y-4 p-12 md:w-[460px]">
                        {modalType ? (
                            <div className="flex flex-col gap-5">
                                <h1 className="text-xl">ავტორიზაცია</h1>
                                <div>google</div>
                                <div>email</div>
                                <div>phone</div>
                                <button onClick={handleSignupClick}>რეგისტრაციაზე გადასვლა</button>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-xl">რეგისტრაცია</h1>
                                <div>google</div>
                                <div>email</div>
                                <div>phone</div>
                                <button onClick={handleSigninClick}>ავტორიზაციაზე გადასვლა</button>
                            </>
                        )}
                    </div>

                    <div className="w-full md:w-[460px]">
                        <Image src={Img} alt="Temporray" className="h-full w-full object-cover" />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
