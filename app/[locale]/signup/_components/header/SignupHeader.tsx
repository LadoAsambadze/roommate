/* eslint-disable @typescript-eslint/no-explicit-any */

import { useTranslation } from 'react-i18next'
import "./index.css"

export default function SignupHeader({ step }: any) {
    const { t } = useTranslation()

    return (
        <div className="flex w-full flex-col bg-[##F2F5FF] px-8 pb-8 pt-12 sm:px-20">
            <div className="flex flex-row items-start justify-between ">
                <div className="flex flex-col items-start">
                    <p className="mt-2 pl-5 text-xs">{t('registerForm')}</p>
                </div>
            </div>
            <div className="flex w-full flex-row">
                <div className="arrow arrow1  z-50 "></div>
                <div className="arrow z-40"></div>
                <div className="arrow  z-30 "></div>
            </div>
            <div className="mt-12 flex flex-row items-center justify-between gap-x-2 pl-5">
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
            </div>
            <div className="mt-2 flex flex-row items-center justify-between pl-5">
                <p className="text-xs ">{t('step')}</p>
                <p className="text-xs ">{t('step')}</p>
                <p className="text-xs ">{t('step')}</p>
            </div>
        </div>
    )
}
