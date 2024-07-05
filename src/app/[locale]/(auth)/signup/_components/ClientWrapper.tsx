/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PopUp } from './popups/Popup'
import { Card, CardContent } from '@/src/components/ui/card'
import SignupHeader from './header/SignupHeader'
import { CustomError } from '@/src/types/error/types'
import StepTwo from './stepTwo/StepTwo'
import StepOne from './stepOne/StepOne'
import { signIn } from 'next-auth/react'
import { SignupAlert } from './popups/SignupAlert'
import { SignupMutation } from '@/graphql/mutation'
import { QuestionObject } from '@/graphql/typesGraphql'

type ClientWrapperProps = {
    questions: QuestionObject[]
}

export default function ClientWrapper({ questions }: ClientWrapperProps) {
    const { t } = useTranslation()
    const [step, setStep] = useState(1)
    const [popupIsOpen, setPopupIsOpen] = useState(false)
    const [alertIsOpen, setAlertIsOpen] = useState(false)
    const [alertType, setAlertType] = useState('')
    const [formData, setFormData] = useState<any>({
        answeredQuestions: [],
    })

    const secondStep = questions?.slice(0, 7)
    const thirthStep = questions?.slice(8, 13)
    const [signUp] = useMutation(SignupMutation, {
        fetchPolicy: 'network-only',
    })
    const router = useRouter()
    const updateFormData = (newData: any) => {
        setFormData((prevData: any) => ({ ...prevData, ...newData }))
    }

    const submit = async () => {
        const modifiedFormData = {
            ...formData,
        }
        delete modifiedFormData.code
        if (typeof modifiedFormData.countryId === 'object' && modifiedFormData.countryId !== null) {
            modifiedFormData.countryId = Number(modifiedFormData.countryId?.value)
        }
        if (typeof modifiedFormData.genderId === 'object' && modifiedFormData.genderId !== null) {
            modifiedFormData.genderId = Number(modifiedFormData.genderId.value)
        }
        if (!modifiedFormData?.email) {
            delete modifiedFormData.email
        }
        const answeredQuestions = []
        for (const key in modifiedFormData.answeredQuestions || {}) {
            const value = modifiedFormData?.answeredQuestions[key]
            if (typeof value === 'string') {
                answeredQuestions.push({ questionId: key, data: value })
            } else if (Array.isArray(value)) {
                if (Array.isArray(value) && typeof value[0] === 'object') {
                    const questionId = value[0]['questionId']
                    const answerIds = (value as unknown as Array<object>).map((item) =>
                        Object.values(item)
                    )
                    answeredQuestions.push({
                        questionId,
                        answerIds: answerIds.flat(),
                    })
                } else {
                    answeredQuestions.push({
                        questionId: key,
                        dataRange: value,
                    })
                }
            } else if (typeof value === 'object' && !Array.isArray(value)) {
                answeredQuestions.push({
                    questionId: value['questionId'],
                    answerIds: [value['value']],
                })
            }
        }

        modifiedFormData.answeredQuestions = answeredQuestions

        try {
            const response = await signUp({
                variables: { userAndAnsweredQuestions: modifiedFormData },
            })

            if (response?.data && response?.data?.signUp.accessToken) {
                signIn('signup', {
                    accessToken: response?.data?.signUp.accessToken,
                    redirect: false,
                })
                if (step === 3) {
                    setPopupIsOpen(true)
                }

                if (typeof formData?.countryId === 'number' && formData.countryId === 145) {
                    router.push('/roommates')
                }
            }
        } catch (error: unknown | CustomError) {
            setAlertIsOpen(true)
            if ((error as CustomError)?.message === 'PHONE_EXISTS') {
                setAlertType('PHONE_EXISTS')
            } else if ((error as CustomError)?.message === 'EMAIL_EXISTS') {
                setAlertType('EMAIL_EXISTS')
            } else {
                setAlertType('ERROR')
            }
        }
    }

    return (
        <>
            <main className="flex h-auto w-full flex-col items-center justify-center  px-6 md:px-[10%] md:pb-16  lg:px-[15%]  xl:px-[334px]">
                <SignupHeader step={step} />
                <PopUp
                    popupIsOpen={popupIsOpen}
                    range={formData?.answeredQuestions && formData?.answeredQuestions[7]}
                    country={formData?.countryId}
                />
                <SignupAlert
                    alertIsOpen={alertIsOpen}
                    alertType={alertType}
                    setAlertIsOpen={setAlertIsOpen}
                />

                <Card className="w-full">
                    <CardContent className="relative w-full bg-white px-6  pb-16  pt-8 sm:px-14">
                        {step === 1 && (
                            <StepOne
                                step={step}
                                setStep={setStep}
                                formData={formData}
                                updateFormData={updateFormData}
                            />
                        )}

                        {step === 2 && (
                            <StepTwo
                                step={step}
                                questions={secondStep}
                                updateFormData={updateFormData}
                                submit={submit}
                                setStep={setStep}
                                formData={formData}
                                next={t('next')}
                            />
                        )}
                        {step === 3 && (
                            <StepTwo
                                step={step}
                                questions={thirthStep}
                                updateFormData={updateFormData}
                                submit={submit}
                                setStep={setStep}
                                formData={formData}
                                next={t('submit')}
                            />
                        )}
                    </CardContent>
                </Card>
            </main>
        </>
    )
}
