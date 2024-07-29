'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation'

import { AlertDialog, AlertDialogContent } from '@/src/components/ui/alert-dialog'
import LoginForm from './LoginForm'

type HeaderProps = {
    modalIsOpen: boolean
    setModalIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function Signin({ setModalIsOpen, modalIsOpen }: HeaderProps) {
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
    }

    const handleClose = () => {
        setModalIsOpen(false)
    }
    const handleClickOutside = (event: { stopPropagation: () => void }) => {
        event.stopPropagation()
    }

    return (
        <>
            <AlertDialog open={modalIsOpen}>
                <div onClick={handleClose}>
                    <AlertDialogContent onClick={handleClickOutside}>
                        <LoginForm />
                    </AlertDialogContent>
                </div>
            </AlertDialog>
        </>
    )
}
