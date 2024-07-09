import { useTranslation } from 'react-i18next'
import './index.css'

type SignupHeaderProps = {
    step: number
}

export default function SignupHeader({ step }: SignupHeaderProps) {
    const { t } = useTranslation()

    return (
        <div className="flex w-full flex-col bg-[##F2F5FF] pb-4 pt-8">
            <div className="flex w-full flex-row">
                <div
                    className={`arrow arrowStart  z-50 flex items-center justify-center rounded-l-xl bg-mainGreen text-[#FFFFFF] ${step > 1 ? 'arrow-active1' : ''} ${step >= 1 ? 'arrow-active ' : ''}`}
                >
                    1 {t('step')}
                </div>
                <div
                    className={`arrow z-40 flex items-center justify-center ${step > 2 ? 'arrow-active1 text-[#FFFFFF]' : ''} ${step >= 2 ? 'arrow-active text-[#FFFFFF]' : ''}`}
                >
                    {' '}
                    2 {t('step')}
                </div>
                <div
                    className={`arrow z-30 flex items-center justify-center ${step > 3 ? 'arrow-active1 text-[#FFFFFF]' : ''} ${step >= 3 ? 'arrow-active text-[#FFFFFF]' : ''}`}
                >
                    3 {t('step')}
                </div>
            </div>
        </div>
    )
}
