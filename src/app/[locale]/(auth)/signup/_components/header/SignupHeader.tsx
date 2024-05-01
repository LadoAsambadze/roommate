/* eslint-disable @typescript-eslint/no-explicit-any */

import { useTranslation } from 'react-i18next'
import './index.css'

export default function SignupHeader({ step }: any) {
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
                    {' '}
                    3 {t('step')}
                </div>
            </div>
            {/* <div className="mt-12 flex flex-row items-center justify-between gap-x-2 pl-5">
                <div className="flex flex-col justify-center ">
                    <div className="test flex h-8 w-8 items-center  justify-center rounded-full border-2 border-[#19A463]">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#19A463] text-xs font-semibold text-[#19A463] ">
                            1
                        </div>
                    </div>
                </div>
                <div
                    className={`h-[3px] w-full rounded-xl ${
                        step >= 2 ? 'bg-[#19A463]' : 'bg-[#939AB6]'
                    }`}
                ></div>
                <div className="flex flex-col justify-center">
                    <div
                        className={`flex h-8 w-8  items-center justify-center rounded-full border-2 ${
                            step >= 2 ? 'border-[#19A463]' : 'border-[#838CAC]'
                        }`}
                    >
                        <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-semibold ${
                                step >= 2
                                    ? 'border-[#19A463] text-[#19A463]'
                                    : 'border-[#838CAC] text-[#838CAC]'
                            }`}
                        >
                            2
                        </div>
                    </div>
                </div>
                <div
                    className={`h-[3px] w-full rounded-xl ${
                        step >= 3 ? 'bg-[#19A463]' : 'bg-[#939AB6]'
                    }`}
                ></div>
                <div
                    className={`w-fullrounded-xl h-[3px] ${
                        step >= 3 ? 'border-[#19A463]' : 'bg-[#939AB6]'
                    }`}
                ></div>
                <div className="flex flex-col justify-center">
                    <div
                        className={`flex h-8 w-8  items-center justify-center rounded-full border-2 ${
                            step >= 3 ? 'border-[#19A463]' : 'border-[#838CAC]'
                        }`}
                    >
                        <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-semibold ${
                                step >= 3
                                    ? 'border-[#19A463] text-[#19A463]'
                                    : 'border-[#838CAC] text-[#838CAC]'
                            }`}
                        >
                            3
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
