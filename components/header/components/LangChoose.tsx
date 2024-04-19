'use client'

import i18nConfig from '@/libs/i18next/i18nConfig'

import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

interface LangChooseProps {
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
        if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
            router.push('/' + newLocale + currentPathname)
        } else {
            router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
        }

        router.refresh()
    }

    return (
        <>
            <div className={`${className}`} onClick={handleLangSwitch}>
                <span className={`${spanClassname}`}>{newLocale === 'ka' ? 'GEO' : 'ENG'}</span>
            </div>
        </>
    )
}

export default LangChoose
