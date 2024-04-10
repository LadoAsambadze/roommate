'use client'

import { signup_submit } from '@/graphql/queries/mutations/signupSubmit'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PopUp } from './popups/Popup'
import { Card, CardContent } from '@/components/ui/card'
import dynamic from 'next/dynamic'
import StepTwo from './steps/StepTwo'
const StepOne = dynamic(() => import('./steps/StepOne'), { ssr: false })

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function MultiStepCard({ countries, gender, questions }: any) {
    const { t } = useTranslation()
    const [step, setStep] = useState(1)
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState<any>({ answeredQuestions: {} })
    const secondStep = questions?.slice(0, 7)
    const thirthStep = questions?.slice(8, 13)
    const [signUp] = useMutation(signup_submit)
    const router = useRouter()

    const showErrorWithHelp = () => {
        alert(t('serverError'))
        if (confirm('Go to support')) {
            window.open(
                'https://www.facebook.com/share/E3WJ5xzYtAQ4itRd/?mibextid=WC7FNe',
                '_blank'
            )
        }
    }

    const updateFormData = (newData: any) => {
        setFormData((prevData: any) => ({ ...prevData, ...newData }))
    }

    const submit = async () => {
        const modifiedFormData: any = {
            ...formData,
        }
        delete modifiedFormData.code
        if (modifiedFormData.countryId) {
            modifiedFormData.countryId = Number(modifiedFormData.countryId.value)
        }
        if (modifiedFormData.genderId) {
            modifiedFormData.genderId = Number(modifiedFormData.genderId.value)
        }
        if (modifiedFormData.email === '') {
            delete modifiedFormData.email
        }
        const answeredQuestions = []
        for (const key in modifiedFormData.answeredQuestions) {
            const value = modifiedFormData.answeredQuestions[key]
            if (typeof value === 'string') {
                answeredQuestions.push({ questionId: key, data: value })
            } else if (Array.isArray(value)) {
                if (typeof value[0] === 'object') {
                    const questionId = value[0]['questionId']
                    const answerIds = value.map((item) => item['value'])
                    answeredQuestions.push({
                        questionId: questionId,
                        answerIds: answerIds,
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
        console.log(modifiedFormData)

        try {
            const response = await signUp({
                variables: { userAndAnsweredQuestions: modifiedFormData },
            })

            if (response?.data && response?.data?.signUp.accessToken) {
                if (step === 3) {
                    setIsOpen(true)
                }
                if (formData?.countryId?.value === '145') {
                    router.push('/')
                }
            }
        } catch (error: any) {
            if (error?.message === 'PHONE_EXISTS') {
                alert(t('phoneExist'))
            } else if (error?.message === 'EMAIL_EXISTS') {
                alert(t('emailExist'))
            } else {
                showErrorWithHelp()
            }
        }
    }

    return (
        <>
            <div className="flex min-h-screen w-full items-center justify-center  md:px-[10%] md:pb-16 md:pt-20 lg:px-[15%] lg:pt-36 xl:px-[334px]">
                <Card>
                    <PopUp
                        isOpen={isOpen}
                        range={formData.answeredQuestions[7]}
                        country={formData?.countryId?.value}
                    />
                    {/* <SignupStepsHeader step={step} /> */}
                    <CardContent className="bg-white px-10 pb-16  pt-8  sm:px-28">
                        {step === 1 && (
                            <div>
                                <StepOne
                                    countries={countries}
                                    gender={gender}
                                    setStep={setStep}
                                    formData={formData}
                                    updateFormData={updateFormData}
                                />
                            </div>
                        )}
                        {step === 2 && (
                            <div>
                                <StepTwo
                                    questions={secondStep}
                                    updateFormData={updateFormData}
                                    submit={submit}
                                    setStep={setStep}
                                    formData={formData}
                                    step={step}
                                    next={t('next')}
                                />
                            </div>
                        )}
                        {step === 3 && (
                            <div>
                                <StepTwo
                                    questions={thirthStep}
                                    updateFormData={updateFormData}
                                    submit={submit}
                                    setStep={setStep}
                                    formData={formData}
                                    step={step}
                                    next={t('submit')}
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
