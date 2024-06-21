import { useTranslation } from 'react-i18next'
import './index.css'

type SignupHeaderProps = {
    step: number
}

export default function SignupHeader({ step }: SignupHeaderProps) {
    const { t } = useTranslation()

    return (
        <div className="flex w-full flex-col bg-[##F2F5FF]   pb-4 pt-8 ">
            <div className="flex flex-row items-start justify-between ">
                <div className="flex flex-col items-start">
                    <p className=" mb-8 text-base">{t('registerForm')}</p>
                </div>
            </div>
            <div className="flex w-full flex-row">
                <div
                    className={`arrow arrowStart  z-50 flex items-center justify-center rounded-l-xl text-base  text-[#FFFFFF] ${step > 1 ? 'arrow-active1' : ''} ${step >= 1 ? 'arrow-active ' : ''}`}
                    style={{
                        backgroundColor:
                            step === 1 ? 'rgba(25, 164, 99, 0.65)' : step > 1 ? '#19A463' : '',
                    }}
                >
                    1 {t('step')}
                </div>
                <div
                    className={`arrow z-40 flex items-center justify-center ${step > 2 ? 'arrow-active1' : ''} ${step >= 2 ? 'arrow-active' : ''}`}
                    style={{
                        color: step >= 2 ? '#FFFFFF' : '#757272',
                        backgroundColor:
                            step === 2 ? 'rgba(25, 164, 99, 0.65)' : step > 2 ? '#19A463' : '',
                    }}
                >
                    {' '}
                    2 {t('step')}
                </div>
                <div
                    className={`arrow z-30 flex items-center justify-center ${step > 3 ? 'arrow-active1' : ''} ${step >= 3 ? 'arrow-active' : ''}`}
                    style={{
                        color: step >= 3 ? '#FFFFFF' : '#757272',
                        backgroundColor:
                            step === 3 ? 'rgba(25, 164, 99, 0.65)' : step > 3 ? '#19A463' : '',
                    }}
                >
                    3 {t('step')}
                </div>
            </div>
        </div>
    )
}
