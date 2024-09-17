'use client'

import i18nConfig from '@/src/libs/i18n/i18nConfig'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

type LangChooseProps = {
    className: string
    spanClassname: string
}

const LangChoose = ({ className, spanClassname }: LangChooseProps) => {
    const currentPathname = usePathname()
    const router = useRouter()
    const { i18n } = useTranslation()
    const currentLocale = i18n.language
    const newLocale = currentLocale === 'ka' ? 'en' : 'ka'

    const handleLangSwitch = () => {
        const newLocale = currentLocale === 'ka' ? 'en' : 'ka'
        let newPath: string

        if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
            newPath = '/' + newLocale + currentPathname
        } else {
            newPath = currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
        }

        // Save the query parameters
        const queryParams = new URLSearchParams(window.location.search)
        if (queryParams.toString()) {
            newPath += '?' + queryParams.toString()
        }

        router.push(newPath)
        router.refresh()
    }

    return (
        <>
            <div
                className={`${className} ${currentPathname.includes('/landlords') ? 'bg-mainOrange text-white' : 'bg-[#F2F5FF] text-[#838CAC]'}`}
                onClick={handleLangSwitch}
            >
                <span className={`${spanClassname}`}>{newLocale === 'ka' ? 'GEO' : 'ENG'}</span>
            </div>
        </>
    )
}

export default LangChoose
