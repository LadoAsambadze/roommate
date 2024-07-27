'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation'

import { AlertDialog, AlertDialogContent } from '@/src/components/ui/alert-dialog'
import { useAuth } from '@/src/libs/apollo/AuthContext'

type HeaderProps = {
    modalIsOpen: boolean
    setModalIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function Signin({ setModalIsOpen, modalIsOpen }: HeaderProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useAuth()
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        const success = await login(email, password)
        if (success) {
            router.push('/example')
        } else {
            setError('Invalid credentials')
        }
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
                        <form onSubmit={handleLogin} className="flex flex-col gap-10">
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <button type="submit">Login</button>
                        </form>
                    </AlertDialogContent>
                </div>
            </AlertDialog>
        </>
    )
}
